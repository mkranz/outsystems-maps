/// <reference path="../../../../OSFramework/Configuration/AbstractConfiguration.ts" />

// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace Provider.Google.Configuration.DrawingTools {
    export class DrawConfig
        extends OSFramework.Configuration.AbstractConfiguration
        implements OSFramework.Configuration.IConfigurationTool
    {
        public allowDrag: boolean;
        public uniqueId: string;

        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
        constructor(config: any) {
            super(config);
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        public getProviderConfig(): any {
            // eslint-disable-next-line prefer-const
            let provider = {
                clickable: true,
                draggable: this.allowDrag
            };

            //Deleting all the undefined properties
            Object.keys(provider).forEach((key) => {
                if (provider[key] === undefined) delete provider[key];
            });

            return provider;
        }
    }
}
