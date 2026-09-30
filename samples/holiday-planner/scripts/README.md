# Holiday Planner provisioning

`Provision-HolidayLists.ps1` creates the `OrganizationHolidays` SharePoint list used by the sample. It is idempotent: existing columns are reused, and seeded holidays are matched by title, date, country, and region before insertion.

## Prerequisites

- PowerShell 7 recommended
- PnP.PowerShell: `Install-Module PnP.PowerShell -Scope CurrentUser`
- An Entra app registration created once with `Register-PnPEntraIDAppForInteractiveLogin`; PnP.PowerShell 2.2+ requires an explicit client ID
- Permission to create lists and fields on the target SharePoint site

## Parameters

| Parameter | Required | Description |
|---|---:|---|
| `-SiteUrl` | Yes | Absolute URL of the site that will host the holiday calendar |
| `-ClientId` | Yes | Entra application client ID used for interactive PnP sign-in |
| `-SeedSampleData` | No | Add deterministic India and UK demonstration holidays |
| `-Force` | No | Delete and recreate `OrganizationHolidays`; **all existing calendar data is destroyed** |

## Examples

Create the lists without sample rows:

```powershell
./Provision-HolidayLists.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/hr" -ClientId "00000000-0000-0000-0000-000000000000"
```

Create lists and seed demonstration data:

```powershell
./Provision-HolidayLists.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/hr" -ClientId "00000000-0000-0000-0000-000000000000" -SeedSampleData
```

Recreate from scratch (destructive):

```powershell
./Provision-HolidayLists.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/hr" -ClientId "00000000-0000-0000-0000-000000000000" -SeedSampleData -Force
```

After list provisioning, set the tenant property in the app catalog:

```powershell
Set-PnPStorageEntity -Key HolidayPlannerSite -Value "https://contoso.sharepoint.com/sites/hr" -Description "Site hosting the Holiday Planner lists"
```

The property can be changed later without rebuilding or redeploying the package.

## List fields

`OrganizationHolidays` contains `Title` (Text), `HolidayDate` (DateTime), `Country` (multi-choice: India, United Kingdom, Global), `Region` (Text), `IsOptional` (Boolean), and `Description` (Note). `IsOptional` is the only holiday classification field: Yes means Optional; No means Fixed. A holiday shared by multiple countries can be stored once with several countries selected; choose `Global` for a holiday shared across all country calendars. Running the provisioner removes the obsolete `HolidayType` column without deleting list items.