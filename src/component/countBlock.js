import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {increment,decrement} from '../actions';
function ReducxTest() {
    const counter = useSelector(state => state.Counter);
    const dispatch = useDispatch();
   
    return(
      <div className="col-md-12">
        <p>redux test</p>
        <span>Count : </span><span>{counter}</span><br/>
        <div className="btn-group">
              <button className="btn btn-primary" onClick={() => dispatch(increment())}>+</button>
        <button className="btn btn-primary" onClick={() => dispatch(decrement())}>-</button>
        </div>
      
      </div>
    )
  }
  export default ReducxTest;