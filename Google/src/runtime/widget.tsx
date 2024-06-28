import React, { useState, useEffect, useRef } from 'react';
import { AllWidgetProps } from "jimu-core";
import { JimuMapViewComponent, JimuMapView } from 'jimu-arcgis';
import Point from "esri/geometry/Point";
import PicIcon from './google.svg';

const Widget = (props: AllWidgetProps<any>) => {
  const [picState, setPicState] = useState(false);
  const [streetView, setStreetView] = useState(false);
  const jimuMapViewRef = useRef<JimuMapView>(null);
  const clickEventListenerRef = useRef<any>(null); // Ref to store the click event listener

  useEffect(() => {
    const handleMapClick = (jmv: JimuMapView) => {
      if (jmv) {
        clickEventListenerRef.current = jmv.view.on("click", (evt) => {
          const point: Point = jmv.view.toMap({
            x: evt.x,
            y: evt.y
          });
          const lat = point.latitude.toFixed(5);
          const lon = point.longitude.toFixed(5);

          // Construct URL with coordinates
          let url = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}&zoom=19`;
          if (streetView) {
            url = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lon}`;
          }
          // Open new web page
          window.open(url, "_blank");
        });
      }
    };

    if (picState && jimuMapViewRef.current) {
      // Add event listener when picState is true and jimuMapViewRef is available
      handleMapClick(jimuMapViewRef.current);
    } else {
      // Remove event listener when picState is false or jimuMapViewRef is not available
      clickEventListenerRef.current?.remove(); // Remove the event listener
    }

    // Cleanup function to remove event listener when component unmounts or picState changes
    return () => {
      clickEventListenerRef.current?.remove(); // Remove the event listener
    };
  }, [picState, streetView]);

  const togglePicState = () => {
    setPicState(prevState => !prevState); 
  };

  const toggleStreetView = () => {
    setStreetView(prevState => !prevState);
  };

  // Stylize the div container
  const divStyle = { 
    width: '100%', 
    height: '100px', 
    backgroundColor: picState ? '#004ca3' : '#076fe5', 
    color: 'white', 
    border: 'none', 
    padding: '10px 10px', 
    fontSize: '16px', 
    borderRadius: '30px',
    cursor: 'pointer'
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', padding: '20px' }}>
      {picState ? (
        <div>
          <JimuMapViewComponent 
            useMapWidgetId={props.useMapWidgetIds?.[0]} 
            onActiveViewChange={jmv => jimuMapViewRef.current = jmv} 
          />
          <button id="Google-button" style={divStyle} onClick={togglePicState}>
            <img src={PicIcon} alt="Google icon" style={{ width: '50px', height:'50px', borderRadius: '15px' }} /> 
            <br />Click to deactivate Google
          </button>
          <br /><br />
          <div style={{ color: '#002855', fontWeight: 'bold', fontSize: '18px', padding: '20px' }}>          
            Click the button above to activate/deactivate Google. When Google is active, click on the map to open Google.
            <br />
          </div>
          <div style={{ color: 'Red', fontWeight: 'bold', fontSize: '18px', padding: '20px' }}> 
            Note: Google will not work if the selection tool is enabled.
          </div> 
          <div style={{color:'red', fontSize: '14px', fontWeight:'bold',padding: '20px' }}>
            <label style={{ color:'#002855', fontSize: '18px', fontWeight: 'bold' }}>
              <input type="checkbox" checked={streetView} onChange={toggleStreetView} style={{ marginRight: '10px' }} />
               Open in Street View
            </label>
            <br/>This only works if a point with a streetview is selected.
          </div>
        </div>
      ) : (
        <div>
          <button id="Google-button" style={divStyle} onClick={togglePicState}>
            <img src={PicIcon} alt="Google icon" style={{ width: '50px', height:'50px', borderRadius: '15px' }} /> 
            <br />Click to activate Google
          </button>
          <br /><br />
          <div style={{ color: '#002855', fontWeight: 'bold', fontSize: '18px', padding: '20px' }}>          
            Click the button above to activate/deactivate Google. When Google is active, click on the map to open Google.
            <br />
          </div>
          <div style={{ color: 'Red', fontWeight: 'bold', fontSize: '18px', padding: '20px' }}> 
            Note: Google will not work if the selection tool is enabled.
          </div>
        </div>
      )}
    </div>
  );
}

export default Widget;
