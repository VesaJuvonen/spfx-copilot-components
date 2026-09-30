<#
.SYNOPSIS
    Creates the SharePoint calendar list used by Holiday Planner.
.DESCRIPTION
    Idempotently creates OrganizationHolidays. Seed rows are
    matched by their title, date, country, and region. -Force deletes the calendar list
    and all its data before recreating it.
.PARAMETER SiteUrl
    Absolute URL of the SharePoint site that hosts the lists.
.PARAMETER ClientId
    Entra application client ID for interactive PnP.PowerShell login.
.PARAMETER SeedSampleData
    Add deterministic sample holidays for India and the United Kingdom.
.PARAMETER Force
    Delete and recreate OrganizationHolidays. This destroys all calendar data.
.EXAMPLE
    ./Provision-HolidayLists.ps1 -SiteUrl https://contoso.sharepoint.com/sites/hr -ClientId 00000000-0000-0000-0000-000000000000 -SeedSampleData
.NOTES
    Register a PnP login application once with Register-PnPEntraIDAppForInteractiveLogin.
#>
[CmdletBinding(SupportsShouldProcess = $true)]
param(
    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string]$SiteUrl,

    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string]$ClientId,

    [Parameter(Mandatory = $false)]
    [switch]$SeedSampleData,

    [Parameter(Mandatory = $false)]
    [switch]$Force
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$script:HolidayList = 'OrganizationHolidays'
function Add-FieldIfMissing {
    param(
        [Parameter(Mandatory = $true)][string]$List,
        [Parameter(Mandatory = $true)][string]$Name,
        [Parameter(Mandatory = $true)][string]$Type,
        [string[]]$Choices = @()
    )

    $field = Get-PnPField -List $List -Identity $Name -ErrorAction SilentlyContinue
    if ($field) {
        Write-Host "    Field '$Name' already exists on '$List'." -ForegroundColor DarkGray
        return
    }

    $arguments = @{
        List = $List
        DisplayName = $Name
        InternalName = $Name
        Type = $Type
        AddToDefaultView = $true
    }
    if ($Choices.Count -gt 0) {
        $arguments['Choices'] = $Choices
    }
    Add-PnPField @arguments | Out-Null
    Write-Host "    Added '$Name' ($Type) to '$List'." -ForegroundColor DarkGray
}

function Remove-LegacyHolidayTypeField {
    $field = Get-PnPField -List $script:HolidayList -Identity 'HolidayType' -ErrorAction SilentlyContinue
    if ($field -and $PSCmdlet.ShouldProcess("$($script:HolidayList).HolidayType", 'Remove obsolete field and its stored values')) {
        Remove-PnPField -List $script:HolidayList -Identity 'HolidayType' -Force
        Write-Host "    Removed obsolete 'HolidayType'; 'IsOptional' now determines Fixed or Optional." -ForegroundColor DarkGray
    }
}

function Ensure-CountryField {
    $choices = @('India', 'United Kingdom', 'Global')
    $field = Get-PnPField -List $script:HolidayList -Identity 'Country' -ErrorAction SilentlyContinue
    if (-not $field) {
        Add-PnPField -List $script:HolidayList -DisplayName 'Country' -InternalName 'Country' -Type MultiChoice -Choices $choices -AddToDefaultView | Out-Null
        Write-Host "    Added multi-choice 'Country' field with Global support." -ForegroundColor DarkGray
        return
    }

    Set-PnPField -List $script:HolidayList -Identity 'Country' -Values @{
        AllowMultipleValues = $true
        Choices = $choices
    } | Out-Null
    Write-Host "    Updated 'Country' to multi-choice with Global support." -ForegroundColor DarkGray
}

function Ensure-List {
    param([Parameter(Mandatory = $true)][string]$Title)

    $list = Get-PnPList -Identity $Title -ErrorAction SilentlyContinue
    if ($list -and $Force) {
        if ($PSCmdlet.ShouldProcess($Title, 'Delete list and all its data')) {
            Remove-PnPList -Identity $Title -Force
            $list = $null
        }
    }
    if (-not $list) {
        if ($PSCmdlet.ShouldProcess($Title, 'Create generic list')) {
            New-PnPList -Title $Title -Template GenericList -OnQuickLaunch | Out-Null
        }
    }
    return Get-PnPList -Identity $Title
}

function Get-SeedKey {
    param([string]$Title, [string]$Date, [object]$Country, [string]$Region)
    $countries = @($Country) | ForEach-Object { ([string]$_).Trim().ToLowerInvariant() } | Where-Object { $_ } | Sort-Object -Unique
    $countryKey = $countries -join ','
    return '{0}|{1}|{2}|{3}' -f $Title.Trim().ToLowerInvariant(), $Date, $countryKey, $Region.Trim().ToLowerInvariant()
}

function Add-SeedHolidays {
    $seed = @(
        @{ Title = 'New Year''s Day'; Date = '2026-01-01'; Country = 'United Kingdom'; Region = ''; Optional = $false; Description = 'UK bank holiday.' },
        @{ Title = 'Republic Day'; Date = '2026-01-26'; Country = 'India'; Region = ''; Optional = $false; Description = 'National holiday in India.' },
        @{ Title = 'Maharashtra Foundation Day'; Date = '2026-05-01'; Country = 'India'; Region = 'Maharashtra'; Optional = $false; Description = 'Region-specific public holiday in Maharashtra.' },
        @{ Title = 'Early May bank holiday'; Date = '2026-05-04'; Country = 'United Kingdom'; Region = ''; Optional = $false; Description = 'UK bank holiday.' },
        @{ Title = 'Ganesh Chaturthi'; Date = '2026-09-14'; Country = 'India'; Region = 'Maharashtra'; Optional = $true; Description = 'Optional regional holiday; date varies by year.' },
        @{ Title = 'Maharashtra Company Planning Day'; Date = '2026-10-01'; Country = 'India'; Region = 'Maharashtra'; Optional = $false; Description = 'Sample company holiday. Friday is a suggested bridge day before the weekend.' },
        @{ Title = 'Gandhi Jayanti'; Date = '2026-10-02'; Country = 'India'; Region = ''; Optional = $false; Description = 'National holiday in India.' },
        @{ Title = 'Diwali'; Date = '2026-11-08'; Country = 'India'; Region = ''; Optional = $false; Description = 'Festival of lights; sample date for demonstration.' },
        @{ Title = 'Christmas Day'; Date = '2026-12-25'; Country = 'India'; Region = ''; Optional = $false; Description = 'National holiday in India.' },
        @{ Title = 'Christmas Day'; Date = '2026-12-25'; Country = 'United Kingdom'; Region = ''; Optional = $false; Description = 'UK bank holiday.' },
        @{ Title = 'Boxing Day (substitute day)'; Date = '2026-12-28'; Country = 'United Kingdom'; Region = ''; Optional = $false; Description = 'Substitute UK bank holiday.' },
        @{ Title = 'New Year''s Day'; Date = '2027-01-01'; Country = 'United Kingdom'; Region = ''; Optional = $false; Description = 'UK bank holiday.' },
        @{ Title = 'Republic Day'; Date = '2027-01-26'; Country = 'India'; Region = ''; Optional = $false; Description = 'National holiday in India.' },
        @{ Title = 'Good Friday'; Date = '2027-03-26'; Country = 'United Kingdom'; Region = ''; Optional = $false; Description = 'UK bank holiday.' },
        @{ Title = 'Early May bank holiday'; Date = '2027-05-03'; Country = 'United Kingdom'; Region = ''; Optional = $false; Description = 'UK bank holiday.' },
        @{ Title = 'Ganesh Chaturthi'; Date = '2027-09-04'; Country = 'India'; Region = 'Maharashtra'; Optional = $true; Description = 'Optional regional holiday; date varies by year.' },
        @{ Title = 'Gandhi Jayanti'; Date = '2027-10-02'; Country = 'India'; Region = ''; Optional = $false; Description = 'National holiday in India.' }
    )

    $existing = Get-PnPListItem -List $script:HolidayList -PageSize 2000 -Fields 'Title', 'HolidayDate', 'Country', 'Region'
    $keys = @{}
    foreach ($item in $existing) {
        $values = $item.FieldValues
        $existingDate = ([datetime]$values['HolidayDate']).ToString('yyyy-MM-dd')
        $countryValue = $values['Country']
        $regionValue = [string]$values['Region']
        $keys[(Get-SeedKey -Title ([string]$values['Title']) -Date $existingDate -Country $countryValue -Region $regionValue)] = $true
    }

    foreach ($holiday in $seed) {
        $key = Get-SeedKey -Title $holiday.Title -Date $holiday.Date -Country $holiday.Country -Region $holiday.Region
        if ($keys.ContainsKey($key)) {
            Write-Host "    Seed '$($holiday.Title)' on $($holiday.Date) already exists." -ForegroundColor DarkGray
            continue
        }
        $values = @{
            Title = $holiday.Title
            HolidayDate = [datetime]::ParseExact($holiday.Date, 'yyyy-MM-dd', [Globalization.CultureInfo]::InvariantCulture)
            Country = @($holiday.Country)
            Region = $holiday.Region
            IsOptional = $holiday.Optional
            Description = $holiday.Description
        }
        if ($PSCmdlet.ShouldProcess("$($holiday.Title) ($($holiday.Date))", 'Create sample holiday')) {
            Add-PnPListItem -List $script:HolidayList -Values $values | Out-Null
            $keys[$key] = $true
            Write-Host "    Seeded $($holiday.Country): $($holiday.Title) ($($holiday.Date))." -ForegroundColor DarkGray
        }
    }
}

if (-not (Get-Module -ListAvailable -Name 'PnP.PowerShell')) {
    throw "PnP.PowerShell is not installed. Run: Install-Module PnP.PowerShell -Scope CurrentUser"
}
Import-Module PnP.PowerShell -ErrorAction Stop

Write-Host "Connecting to $SiteUrl" -ForegroundColor Cyan
Connect-PnPOnline -Url $SiteUrl -ClientId $ClientId -Interactive

$null = Ensure-List -Title $script:HolidayList

Add-FieldIfMissing -List $script:HolidayList -Name 'HolidayDate' -Type 'DateTime'
Ensure-CountryField
Add-FieldIfMissing -List $script:HolidayList -Name 'Region' -Type 'Text'
Add-FieldIfMissing -List $script:HolidayList -Name 'IsOptional' -Type 'Boolean'
Remove-LegacyHolidayTypeField
Add-FieldIfMissing -List $script:HolidayList -Name 'Description' -Type 'Note'

if ($SeedSampleData) {
    Write-Host 'Adding sample holidays (existing rows are preserved).' -ForegroundColor Cyan
    Add-SeedHolidays
}

Write-Host 'Holiday Planner calendar list is ready.' -ForegroundColor Green
Write-Host "Set the tenant property when ready: Set-PnPStorageEntity -Key HolidayPlannerSite -Value `"$SiteUrl`" -Description 'Site hosting the Holiday Planner lists'" -ForegroundColor DarkGray
