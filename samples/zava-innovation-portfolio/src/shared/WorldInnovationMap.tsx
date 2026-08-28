import * as React from 'react';
import { geoGraticule10, geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature, mesh } from 'topojson-client';
import type { Objects, Topology } from 'topojson-specification';
import worldTopology from 'world-atlas/countries-110m.json';

import type { IRegion } from './domain';
import styles from './WorldInnovationMap.module.scss';

const topology=worldTopology as unknown as Topology<Objects<{}>>;
const worldCountries=feature(topology,topology.objects.countries);
const countryBorders=mesh(topology,topology.objects.countries,(left,right)=>left!==right);
const VIEW_WIDTH=960;
const VIEW_HEIGHT=470;

export interface IWorldInnovationMapProps {
  readonly regions:readonly IRegion[];
  readonly selectedName:string;
  readonly onSelect:(regionName:string)=>void;
}

function conversionTone(conversion:number):string {
  return conversion>=50?'strong':conversion>=44?'healthy':'attention';
}

export default function WorldInnovationMap({regions,selectedName,onSelect}:IWorldInnovationMapProps):React.ReactElement {
  const projection=React.useMemo(()=>geoNaturalEarth1().fitExtent([[18,18],[VIEW_WIDTH-18,VIEW_HEIGHT-18]],worldCountries),[]);
  const path=React.useMemo(()=>geoPath(projection),[projection]);
  const countryPath=path(worldCountries)??'';
  const borderPath=path(countryBorders)??'';
  const graticulePath=path(geoGraticule10())??'';

  return <div className={styles.root}>
    <svg className={styles.map} viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`} role="img" aria-labelledby="innovation-map-title innovation-map-description">
      <title id="innovation-map-title">Global innovation participation and conversion</title>
      <desc id="innovation-map-description">World country map with four selectable reporting regions. Marker size shows submissions and marker color shows conversion to the next innovation stage.</desc>
      <rect className={styles.ocean} width={VIEW_WIDTH} height={VIEW_HEIGHT}/>
      <path className={styles.graticule} d={graticulePath}/>
      <path className={styles.land} d={countryPath}/>
      <path className={styles.borders} d={borderPath}/>
      {regions.map(region=>{
        const projected=projection([region.longitude,region.latitude])??[VIEW_WIDTH/2,VIEW_HEIGHT/2];
        const radius=11+Math.sqrt(region.submissions)*1.55;
        const selected=selectedName===region.name;
        return <g key={region.name} className={styles.marker} data-selected={selected} role="button" tabIndex={0}
          aria-label={`${region.name}: ${region.submissions} submissions, ${region.conversion}% conversion`}
          transform={`translate(${projected[0]} ${projected[1]})`} onClick={()=>onSelect(region.name)}
          onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();onSelect(region.name);}}}>
          <circle className={styles.markerHalo} r={radius+5}/>
          <circle className={styles.markerValue} data-tone={conversionTone(region.conversion)} r={radius}/>
          <text className={styles.markerName} y="-2" textAnchor="middle">{region.name}</text>
          <text className={styles.markerMetric} y="12" textAnchor="middle">{region.conversion}%</text>
        </g>;
      })}
    </svg>
    <div className={styles.legend} aria-label="Map legend">
      <span><i data-tone="strong"/>50%+ conversion</span>
      <span><i data-tone="healthy"/>44-49% conversion</span>
      <span><i data-tone="attention"/>Below 44%</span>
      <span><b>Circle size</b> submissions</span>
    </div>
  </div>;
}
