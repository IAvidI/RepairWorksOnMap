import React from "react";
import { useMapEvents } from "react-leaflet";
import Control from "react-leaflet-custom-control";
import { Button } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";

const CurrentLocation = () => {
  const map = useMapEvents({
    locationfound(e) {
      map.flyTo(e.latlng, 18);
    },
  });

  function getCurrentLocation() {
    map.locate();
  }

  return (
    <>
      <Control position="topleft">
        <Button
          icon={<EnvironmentOutlined />}
          onClick={() => getCurrentLocation()}
          title="Get Current Location"
        />
      </Control>
    </>
  );
};
export default CurrentLocation;
