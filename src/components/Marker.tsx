import React from "react";
import { Marker as LeafletMarker } from "leaflet";
import { LeafletProvider, withLeaflet, MapLayer } from "react-leaflet";

class Marker extends MapLayer {
  static defaultProps = {
    rotationOrigin: "center"
  };
  contextValue: any;
  leafletElement: any;
  props: { children: any };

  createLeafletElement(props) {
    const el = new LeafletMarker(props.position, this.getOptions(props));
    this.contextValue = { ...props.leaflet, popupContainer: el };
    return el;
  }
  getOptions(props: any): any {
    throw new Error("Method not implemented.");
  }

  updateLeafletElement(fromProps, toProps) {
    if (toProps.position !== fromProps.position) {
      this.leafletElement.setLatLng(toProps.position);
    }
    if (toProps.icon !== fromProps.icon) {
      this.leafletElement.setIcon(toProps.icon);
    }
    if (toProps.zIndexOffset !== fromProps.zIndexOffset) {
      this.leafletElement.setZIndexOffset(toProps.zIndexOffset);
    }
    if (toProps.opacity !== fromProps.opacity) {
      this.leafletElement.setOpacity(toProps.opacity);
    }
    if (toProps.draggable !== fromProps.draggable) {
      if (toProps.draggable === true) {
        this.leafletElement.dragging.enable();
      } else {
        this.leafletElement.dragging.disable();
      }
    }
    if (toProps.rotationAngle !== fromProps.rotationAngle) {
      this.leafletElement.setRotationAngle(toProps.rotationAngle);
    }
    if (toProps.rotationOrigin !== fromProps.rotationOrigin) {
      this.leafletElement.setRotationOrigin(toProps.rotationOrigin);
    }
  }

  render() {
    const { children } = this.props;
    return children == null || this.contextValue == null ? null : (
      <LeafletProvider value={this.contextValue}>{children}</LeafletProvider>
    );
  }
}

export default withLeaflet(Marker);
