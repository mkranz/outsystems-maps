/**
 * Namespace that contains the callbacks signatures to be passed in the SearchPlaces events.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace OSFramework.Callbacks.SearchPlaces {
    /**
     * This is the callback signature for events triggered by the SearchPlaces.
     * @param {OSFramework.SearchPlaces.ISearchPlaces} searchPlacesObj object of the SearchPlaces which triggered the event
     * @param {string} searchPlacesId which SearchPlaces triggered the event
     */
    export type Event = {
        (
            searchPlacesObj: OSFramework.SearchPlaces.ISearchPlaces,
            searchPlacesId: string
        ): void;
    };
}
