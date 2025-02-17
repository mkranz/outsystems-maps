// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace Provider.Google.Configuration.OSMap {
    export class GoogleMapConfig
        extends OSFramework.Configuration.AbstractConfiguration
        implements OSFramework.Configuration.IConfigurationMap
    {
        public advancedFormat: string;
        public apiKey: string;
        public center: string | OSFramework.OSStructures.OSMap.Coordinates;
        public height: string;
        public markerClusterer: OSFramework.Configuration.IConfigurationMarkerClusterer;
        public offset: OSFramework.OSStructures.OSMap.Offset;
        public showTraffic: boolean;
        public style: OSFramework.Enum.OSMap.Style;
        public type: OSFramework.Enum.OSMap.Type;
        public uniqueId: string;
        public zoom: OSFramework.Enum.OSMap.Zoom;

        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
        constructor(config: any) {
            super(config);
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        public getProviderConfig(): any {
            const provider = {
                center: this.center,
                zoom: this.zoom,
                styles: this.style,
                mapTypeId: this.type
            };

            //Cleanning undefined properties
            Object.keys(provider).forEach((key) => {
                if (provider[key] === undefined) {
                    delete provider[key];
                }
            });

            return provider;
        }
    }
}
