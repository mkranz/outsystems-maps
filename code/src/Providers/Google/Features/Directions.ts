// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace Provider.Google.Feature {
    export class Directions
        implements
            OSFramework.Feature.IDirections,
            OSFramework.Interface.IBuilder,
            OSFramework.Interface.IDisposable
    {
        private _directionsRenderer: google.maps.DirectionsRenderer;
        private _directionsService: google.maps.DirectionsService;
        private _isEnabled: boolean;
        private _map: OSMap.IMapGoogle;

        constructor(map: OSMap.IMapGoogle) {
            this._map = map;
            this._isEnabled = false;
        }

        /** Makes sure all waypoints from a list of locations (string) gets converted into a list of {location, stopover}. */
        private _waypointsCleanup(
            waypoints: string[]
        ): google.maps.DirectionsWaypoint[] {
            return waypoints.reduce((acc, curr) => {
                acc.push({ location: curr, stopover: true });
                return acc;
            }, []);
        }

        public get isEnabled(): boolean {
            return this._isEnabled;
        }
        public build(): void {
            this._directionsRenderer = new google.maps.DirectionsRenderer();
            this._directionsService = new google.maps.DirectionsService();
            this._directionsRenderer.setMap(this._map.provider);

            this.setState(this._isEnabled);
        }
        public dispose(): void {
            this.setState(false);
            this._directionsService = undefined;
            this._directionsRenderer = undefined;
        }
        public getLegsFromDirection(): Array<OSFramework.OSStructures.Directions.DirectionLegs> {
            // If the Map has the directions disabled return 0 (meters)
            if (this._isEnabled === false) return [];

            const legs = this._directionsRenderer
                .getDirections()
                .routes[0].legs.reduce(
                    (
                        acc: Array<OSFramework.OSStructures.Directions.DirectionLegs>,
                        curr: google.maps.DirectionsLeg
                    ) => {
                        // For each leg, push an object containing the origin (coords), distination (coords), distance (in meters) and duration (in seconds)
                        acc.push({
                            origin: curr.start_location.toJSON(),
                            destination: curr.end_location.toJSON(),
                            distance: curr.distance.value,
                            duration: curr.duration.value
                        });
                        return acc;
                    },
                    []
                );

            return legs;
        }
        public getTotalDistanceFromDirection(): Promise<number> {
            return new Promise((resolve) => {
                // If no route has been set before requesting the distance return 0 (meters)
                if (this._isEnabled === false) resolve(0);

                const distance = this._directionsRenderer
                    .getDirections()
                    .routes[0].legs.reduce((acc, curr) => {
                        // For each leg, sum the distance values (in meters)
                        acc += curr.distance.value;
                        return acc;
                    }, 0);

                resolve(distance);
            });
        }
        public getTotalDurationFromDirection(): Promise<number> {
            return new Promise((resolve) => {
                // If no route has been set before requesting the duration return 0 (meters)
                if (this._isEnabled === false) resolve(0);

                const duration = this._directionsRenderer
                    .getDirections()
                    .routes[0].legs.reduce((acc, curr) => {
                        // For each leg, sum the duration values (in seconds)
                        acc += curr.duration.value;
                        return acc;
                    }, 0);

                resolve(duration);
            });
        }
        public removeRoute(): OSFramework.OSStructures.ReturnMessage {
            this.setState(false);
            if (this._directionsRenderer.getMap() === null) {
                return {
                    isSuccess: true
                };
            } else {
                return {
                    code: OSFramework.Enum.ErrorCodes.API_FailedRemoveDirections
                };
            }
        }

        /**
         * SetPlugin for GoogleMaps provider is not needed.
         */
        public setPlugin(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            providerName: string,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            apiKey: string
        ): OSFramework.OSStructures.ReturnMessage {
            OSFramework.Helper.ThrowError(
                this._map,
                OSFramework.Enum.ErrorCodes.GEN_NoPluginDirectionsNeeded
            );
            return;
        }

        public setRoute(
            directionOptions: OSFramework.OSStructures.Directions.Options
        ): Promise<OSFramework.OSStructures.ReturnMessage> {
            const waypts: google.maps.DirectionsWaypoint[] =
                this._waypointsCleanup(directionOptions.waypoints);
            return (
                this._directionsService
                    .route(
                        {
                            origin: {
                                query: directionOptions.originRoute
                            },
                            destination: {
                                query: directionOptions.destinationRoute
                            },
                            waypoints: waypts,
                            optimizeWaypoints:
                                directionOptions.optimizeWaypoints,
                            travelMode:
                                directionOptions.travelMode as google.maps.TravelMode,
                            avoidTolls: directionOptions.exclude.avoidTolls,
                            avoidHighways:
                                directionOptions.exclude.avoidHighways,
                            avoidFerries: directionOptions.exclude.avoidFerries
                        },
                        (response, status) => {
                            if (status === 'OK') {
                                this._directionsRenderer.setDirections(
                                    response
                                );
                            }
                        }
                    )
                    // If the previous request returns status OK, then we want to return success
                    .then(() => {
                        this.setState(true);
                        return {
                            isSuccess: true
                        };
                    })
                    // Else, we want to return the reason
                    .catch((reason: string) => {
                        this.setState(false);
                        return {
                            code: OSFramework.Enum.ErrorCodes
                                .LIB_FailedSetDirections,
                            message: `${reason}`
                        };
                    })
            );
        }
        public setState(value: boolean): void {
            this._directionsRenderer.setMap(
                value === true ? this._map.provider : null
            );
            this._isEnabled = value;
        }
    }
}
