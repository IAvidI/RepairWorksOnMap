import { useState, useEffect, useRef } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  LayersControl,
  FeatureGroup,
  Polygon,
  useMap,
  useMapEvents,
  ScaleControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";

import $ from 'jquery';

import "./App.css";

import CurrentLocation from "./CurrentLocation";
import ResetViewControl from "@20tab/react-leaflet-resetview";

const position = [48.0196, 66.9237]; // latitude and longitude of Kazakhstan



const MapComponent = ({ areas, setAreas, isLoggedIn }) => {
  const attribution = `
    contributors: 
    &copy; <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a>, 
    Tiles courtesy of 
    &copy; <a href="https://www.thunderforest.com/" target="_blank">Thunderforest</a>
  `;

  // const [areas, setAreas] = useState([]);
  const [useMarkers, setUseMarkers] = useState(false); // state to track whether to use markers or polygons

  function HideShowMarkers() {
    const map = useMap();
    const currentZoom = useRef(map.getZoom()); // store current zoom level in a ref

    // register event listener for zoomend event
    useMapEvents({
      zoomend: () => {
        const zoom = map.getZoom();
        console.log('map zoom:', zoom);
        if (zoom !== currentZoom.current) { // only update state if zoom level has changed
          currentZoom.current = zoom; // update ref with new zoom level
          setUseMarkers(zoom < 13); // set useMarkers based on zoom level
        }
      },
    });
    return null;
  }

  useEffect(() => {
    console.log("areas changed:", areas);
  }, [areas]);

  const _onCreated = (e) => {
    console.log(e);

    const { layerType, layer } = e;
    if (layerType === "polygon") {
      const { _leaflet_id } = layer;

      const properties = {
        creationDate: new Date().toLocaleDateString(),
        expectedFinishDate: "",
        responsiblePerson: "",
        tag: "pending",
      };

      const center = layer.getCenter();

      setAreas((layers) => [
        ...layers,
        { id: _leaflet_id, latlngs: layer.getLatLngs()[0], center: center, properties: properties },
      ]);
    }
  };

  const _onEdited = (e) => {
    console.log(e);
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id, editing }) => {
      setAreas((layers) =>
        layers.map((l) =>
          l.id === _leaflet_id
            ? { ...l, latlngs: { ...editing.latlngs[0] } }
            : l
        )
      );
    });
  };

  {/*
  $(document).ready(function() {
    // Get the edit button
    // const editButton = document.querySelector('.leaflet-draw-edit-edit');
    const editButton = $('.leaflet-draw-edit-edit');
  
    // Add a click event listener to the edit button
    editButton.addEventListener('click', () => {
      // Check if the user is logged in
      if (!isLoggedIn) {
        // Disable the edit controls
        const drawControl = L.Control.Draw.getInstance(map);
        drawControl.setDrawingOptions({
          edit: false
        });
  
        // Show an alert
        alert('You need to be logged in to use this feature!');
      }
    });
  });
  */}


  const _onDeleted = (e) => {
    console.log(e);
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id }) => {
      setAreas((layers) => layers.filter((l) => l.id !== _leaflet_id));
    });
  };

  return (
    <MapContainer
      center={position}
      zoom={5}
      className="map-container"
      zoomControl={false}
    >
      <CurrentLocation />
      <ResetViewControl title="Home Extend" icon={"🌎"} />
      <ScaleControl position="bottomleft" />
      <LayersControl position="topright">
        <LayersControl.BaseLayer name="OpenStreetMap">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution={attribution}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Transport" checked>
          <TileLayer
            url="https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png"
            attribution={attribution}
            maxZoom={100}
          />
        </LayersControl.BaseLayer>
        <HideShowMarkers></HideShowMarkers>
        <LayersControl.Overlay name="Areas" checked>
          <FeatureGroup>
            {areas.map((area) => (
              useMarkers ? (
                <Marker key={area.id} position={area.center} removable={false}>
                  <Popup>
                    <div>
                      <p>Creation Date: {area.properties.creationDate}</p>
                      <p>Expected Finish Date: {area.properties.expectedFinishDate}</p>
                      <p>Responsible Person: {area.properties.responsiblePerson}</p>
                      <p>Tag: {area.properties.tag}</p>
                    </div>
                  </Popup>
                </Marker> 
                
              ) : (
                <></>
              )
            ))}
            {isLoggedIn && <EditControl
              position="bottomleft"
              onCreated={_onCreated}
              onDeleted={_onDeleted}
              onEdited={_onEdited}
              draw={{
                rectangle: false,
                circle: false,
                circlemarker: false,
                marker: false,
                polyline: false,
              }}
            />}
            (isLoggedIn ? (<></>) : (<></>))
            
          </FeatureGroup>
        </LayersControl.Overlay>
      </LayersControl>
      <ZoomControl position="bottomleft" />

    </MapContainer>
  );
}

export default MapComponent;