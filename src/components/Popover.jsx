import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import { Tooltip } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { TbCar } from "react-icons/tb"
import '../pages/stores.css';
import './popover.css';

export default function Popover() {
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Curbside Available!
        </Tooltip>
      );
  return (
    <>
      <OverlayTrigger
        placement="left"
        delay={{ show: 150, hide: 400 }}
        overlay={renderTooltip}
      >
      <Button className='curbside-button'><TbCar /></Button>
      </OverlayTrigger>
    </>
  )
}
