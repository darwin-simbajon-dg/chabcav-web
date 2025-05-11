declare module 'jsvectormap' {
    interface JsVectorMapOptions {
      selector: string;
      map: string;
      zoomOnScroll?: boolean;
      zoomButtons?: boolean;
      selectedMarkers?: number[];
      markersSelectable?: boolean;
      markers?: {
        name: string;
        coords: [number, number];
        style?: {
          fill: string;
        };
      }[];
      markerStyle?: {
        initial?: {
          fill?: string;
        };
        hover?: {
          fill?: string;
        };
        selected?: {
          fill?: string;
        };
      };
    }
  
    export default class JsVectorMap {
      constructor(options: JsVectorMapOptions);
      destroy(): void;
    }
  }
  
  declare module 'jsvectormap/dist/maps/world.js';
  