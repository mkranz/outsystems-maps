// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace OSFramework.Enum {
    /**
     * Codes that get the associated to specific returning messages indicated wheter the action had success or not.
     */
    export enum ErrorCodes {
        // Error Codes - CONFiguration errors - Any error related with missing or wrong configuration of the application.
        CFG_APIKeyAlreadySetMap = 'MAPS-CFG-01001',
        CFG_APIKeyAlreadySetStaticMap = 'MAPS-CFG-02001',
        CFG_CantChangeParamsStaticMap = 'MAPS-CFG-02002',
        CFG_InvalidPolylineShapeLocations = 'MAPS-CFG-05001',
        CFG_InvalidPolygonShapeLocations = 'MAPS-CFG-05002',
        CFG_InvalidCircleShapeCenter = 'MAPS-CFG-05003',

        // Error Codes - LIB errors - Specific errors generated when consuming a third party lib / providers
        LIB_InvalidApiKeyMap = 'MAPS-LIB-01001',
        LIB_FailedGeocodingMap = 'MAPS-LIB-01002',
        LIB_InvalidApiKeyStaticMap = 'MAPS-LIB-02001',
        LIB_FailedGeocodingMarker = 'MAPS-LIB-03001',
        LIB_FailedSetDirections = 'MAPS-LIB-04001',
        LIB_FailedGeocodingShapeLocations = 'MAPS-LIB-05001',

        // Error Codes - API errors - Specific errors generated when exposing the component client actions API/Framework.
        API_FailedRemoveDirections = 'MAPS-API-03001',
        // It was not possible to get the path from the Shape
        API_FailedGettingShapePath = 'MAPS-API-05001',
        // It was not possible to get the Circle
        API_FailedGettingCircleShape = 'MAPS-API-05002',
        // It was not possible to get the shape center
        API_FailedGettingShapeCenter = 'MAPS-API-05003',
        // It was not possible to get the shape radius
        API_FailedGettingShapeRadius = 'MAPS-API-05004',

        // Error Codes - GENeral error - General or internal Errors of the component. In the situation of simple components without different features/sections inside it, the GEN acronym should be used.
        GEN_InvalidChangePropertyMap = 'MAPS-GEN-01001',
        GEN_InvalidChangePropertyMarker = 'MAPS-GEN-03001',
        GEN_UnsupportedEventMap = 'MAPS-GEN-01002',
        GEN_UnsupportedEventMarker = 'MAPS-GEN-03002',
        GEN_InvalidChangePropertyShape = 'MAPS-GEN-05001',
        GEN_UnsupportedEventShape = 'MAPS-GEN-05002'
    }
}
