/// <reference path="../AbstractConfiguration.ts" />

// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace OSFramework.Configuration.OSMap {
    export class GoogleMapConfig
        extends AbstractConfiguration
        implements IConfigurationMap {
        public advancedFormat: string;
        public apiKey: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        public center: any;
        public extendedClass: string;
        public height: string;
        public offset: OSStructures.OSMap.Offset;
        public showTraffic: boolean;
        public staticMap: boolean;
        public style: Enum.OSMap.Style;
        public type: Enum.OSMap.Type;
        public uniqueId: string;
        public zoom: Enum.OSMap.Zoom;

        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
        constructor(config: any) {
            super(config);
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        public getProviderConfig(): any {
            // eslint-disable-next-line prefer-const
            let provider = {
                center: this.center,
                zoom: this.zoom,
                styles: this.style,
                mapTypeId: this.type
            };

            //Cleanning undefined properties
            Object.keys(provider).forEach(
                (key) => provider[key] === undefined && delete provider[key]
            );

            return provider;
        }
    }
}
