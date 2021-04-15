const MapLink = ({address}) => (
    <a onClick={e => onAddressClick(e, address)} className="restaurant-address">{address.join(" ")}</a>
);

function onAddressClick(e, address) {
    e.preventDefault();
    openInNewTab(formatMapLink(address));
}

function openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
}

function formatMapLink(address) {
    return "https://www.google.com/maps/place/" + address.join(" ").replace(" ", "+");
}

export default MapLink;
