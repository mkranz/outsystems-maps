// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace OutSystems.Maps.MapAPI.MarkerManager {
    const markerMap = new Map<string, string>(); //marker.uniqueId -> map.uniqueId
    const markerArr = new Array<OSFramework.Marker.IMarker>();

    /**
     * Changes the property value of a given Marker.
     *
     * @export
     * @param {string} markerId Id of the Marker to be changed
     * @param {string} propertyName name of the property to be changed - some properties of the provider might not work out of be box
     * @param {*} propertyValue value to which the property should be changed to.
     */
    export function ChangeProperty(
        markerId: string,
        propertyName: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
        propertyValue: any
    ): void {
        const marker = GetMarkerById(markerId);
        const map = marker.map;

        if (map !== undefined) {
            map.changeMarkerProperty(markerId, propertyName, propertyValue);
        }
    }

    /**
     * Close the Popup of the MarkerPopup
     * @param markerId Id of the Marker
     */
    export function ClosePopup(markerId: string): void {
        const marker = GetMarkerById(
            markerId
        ) as OSFramework.Marker.IMarkerPopup;
        if (marker.hasPopup) marker.closePopup();
    }

    /**
     * Forces the refresh of the content inside the Popup of the MarkerPopup
     * @param markerId Id of the Marker
     */
    export function RefreshPopup(markerId: string): void {
        const marker = GetMarkerById(
            markerId
        ) as OSFramework.Marker.IMarkerPopup;
        if (marker.hasPopup) marker.refreshPopupContent();
    }

    /**
     * Function that will create an instance of Map object with the configurations passed
     *
     * @export
     * @param {string} mapId Id of the Map where the change will occur
     * @param {string} configs configurations for the Map in JSON format
     * @returns {*}  {OSMap.IMarker} instance of the Map
     */
    export function CreateMarker(
        mapId: string,
        markerId: string,
        configs: string
    ): OSFramework.Marker.IMarker {
        const map = MapManager.GetMapById(mapId, true);
        if (!map.hasMarker(markerId)) {
            const _marker = Provider.Google.Marker.MarkerFactory.MakeMarker(
                map,
                markerId,
                OSFramework.Enum.MarkerType.Marker,
                JSON.parse(configs)
            );
            markerArr.push(_marker);
            markerMap.set(markerId, map.uniqueId);
            map.addMarker(_marker);

            return _marker;
        } else {
            throw new Error(
                `There is already a Marker registered on the specified Map under id:${markerId}`
            );
        }
    }

    /**
     * Function that will create an instance of Map object with the configurations passed
     *
     * @export
     * @param {string} configs configurations for the Map in JSON format
     * @returns {*}  {OSMap.IMarker} instance of the Map
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    export function CreateMarkerByUniqueID(
        markerId: string,
        markerType: OSFramework.Enum.MarkerType,
        configs: string
    ): OSFramework.Marker.IMarker {
        const map = GetMapByMarkerId(markerId);
        if (!map.hasMarker(markerId)) {
            const _marker = OSFramework.Marker.MarkerFactory.MakeMarker(
                map,
                markerId,
                markerType,
                JSON.parse(configs)
            );
            markerArr.push(_marker);
            markerMap.set(markerId, map.uniqueId);
            map.addMarker(_marker);

            Events.CheckPendingEvents(_marker);
            return _marker;
        } else {
            throw new Error(
                `There is already a Marker registered on the specified Map under id:${markerId}`
            );
        }
    }

    /**
     * [Not used]
     * Gets the Map to which the Marker belongs to
     *
     * @param {string} markerId Id of the Marker that exists on the Map
     * @returns {*}  {MarkerMapper} this structure has the id of Map, and the reference to the instance of the Map
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function GetMapByMarkerId(markerId: string): OSFramework.OSMap.IMap {
        let map: OSFramework.OSMap.IMap;

        //markerId is the UniqueId
        if (markerMap.has(markerId)) {
            map = MapManager.GetMapById(markerMap.get(markerId), false);
        }
        //UniqueID not found
        else {
            // Try to find its reference on DOM
            const elem = OSFramework.Helper.GetElementByUniqueId(
                markerId,
                false
            );

            // If element is found, means that the DOM was rendered
            if (elem !== undefined) {
                //Find the closest Map
                const mapId = OSFramework.Helper.GetClosestMapId(elem);
                map = MapManager.GetMapById(mapId);
            }
        }

        return map;
    }

    /**
     * Returns a Marker based on Id
     * @param markerId Id of the Marker
     */
    export function GetMarkerById(
        markerId: string,
        raiseError = true
    ): OSFramework.Marker.IMarker {
        const marker: OSFramework.Marker.IMarker = markerArr.find(
            (p) => p && p.equalsToID(markerId)
        );

        if (marker === undefined && raiseError) {
            throw new Error(`Marker id:${markerId} not found`);
        }

        return marker;
    }

    /**
     * Open the Popup of the MarkerPopup
     * @param markerId Id of the Marker
     */
    export function OpenPopup(markerId: string): void {
        const marker = GetMarkerById(
            markerId
        ) as OSFramework.Marker.IMarkerPopup;
        if (marker.hasPopup) marker.openPopup();
    }

    /**
     * Function that will destroy the Marker from the current page
     *
     * @export
     * @param {string} markerID id of the Marker that is about to be removed
     */
    export function RemoveMarker(markerId: string): void {
        const marker = GetMarkerById(markerId);
        const map = marker.map;

        map && map.removeMarker(markerId);
        markerMap.delete(markerId);
        markerArr.splice(
            markerArr.findIndex((p) => {
                return p && p.equalsToID(markerId);
            }),
            1
        );
    }
}

/// Overrides for the old namespace - calls the new one, lets users know this is no longer in use

// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace MapAPI.MarkerManager {
    export function ChangeProperty(
        markerId: string,
        propertyName: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
        propertyValue: any
    ): void {
        OSFramework.Helper.LogWarningMessage(
            `${OSFramework.Helper.warningMessage} 'OutSystems.Maps.MapAPI.MarkerManager.ChangeProperty()'`
        );
        OutSystems.Maps.MapAPI.MarkerManager.ChangeProperty(
            markerId,
            propertyName,
            propertyValue
        );
    }

    export function ClosePopup(markerId: string): void {
        OSFramework.Helper.LogWarningMessage(
            `${OSFramework.Helper.warningMessage} 'OutSystems.Maps.MapAPI.MarkerManager.ClosePopup()'`
        );
        OutSystems.Maps.MapAPI.MarkerManager.ClosePopup(markerId);
    }

    export function RefreshPopup(markerId: string): void {
        OSFramework.Helper.LogWarningMessage(
            `${OSFramework.Helper.warningMessage} 'OutSystems.Maps.MapAPI.MarkerManager.RefreshPopup()'`
        );
        OutSystems.Maps.MapAPI.MarkerManager.RefreshPopup(markerId);
    }

    export function CreateMarker(
        mapId: string,
        markerId: string,
        configs: string
    ): OSFramework.Marker.IMarker {
        OSFramework.Helper.LogWarningMessage(
            `${OSFramework.Helper.warningMessage} 'OutSystems.Maps.MapAPI.MarkerManager.CreateMarker()'`
        );
        return OutSystems.Maps.MapAPI.MarkerManager.CreateMarker(
            mapId,
            markerId,
            configs
        );
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    export function CreateMarkerByUniqueID(
        markerId: string,
        markerType: OSFramework.Enum.MarkerType,
        configs: string
    ): OSFramework.Marker.IMarker {
        OSFramework.Helper.LogWarningMessage(
            `${OSFramework.Helper.warningMessage} 'OutSystems.Maps.MapAPI.MarkerManager.CreateMarkerByUniqueID()'`
        );
        return OutSystems.Maps.MapAPI.MarkerManager.CreateMarkerByUniqueID(
            markerId,
            markerType,
            configs
        );
    }

    export function GetMarkerById(
        markerId: string,
        raiseError = true
    ): OSFramework.Marker.IMarker {
        OSFramework.Helper.LogWarningMessage(
            `${OSFramework.Helper.warningMessage} 'OutSystems.Maps.MapAPI.MarkerManager.GetMarkerById()'`
        );
        return OutSystems.Maps.MapAPI.MarkerManager.GetMarkerById(
            markerId,
            raiseError
        );
    }

    export function OpenPopup(markerId: string): void {
        OSFramework.Helper.LogWarningMessage(
            `${OSFramework.Helper.warningMessage} 'OutSystems.Maps.MapAPI.MarkerManager.OpenPopup()'`
        );
        return OutSystems.Maps.MapAPI.MarkerManager.OpenPopup(markerId);
    }

    export function RemoveMarker(markerId: string): void {
        OSFramework.Helper.LogWarningMessage(
            `${OSFramework.Helper.warningMessage} 'OutSystems.Maps.MapAPI.MarkerManager.RemoveMarker()'`
        );
        OutSystems.Maps.MapAPI.MarkerManager.RemoveMarker(markerId);
    }
}
