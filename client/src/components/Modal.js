import React, { useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import {
  showModal,
  selectModal
} from '../state/modals/modalSlice';

import _ from 'underscore';;

const equality = (a, b) => true 
export function Modal({name, component: Component}) {
  const modal = useSelector(selectModal, equality);
  console.log(modal)
  if (name === modal) {
    return (
      <div>
        {name}
        <Component/>
      </div>
    )
  }
  return null
}
