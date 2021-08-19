import React from "react";
import { useState, useEffect } from "react";
import { drums } from "./Data";

const Drum = () => {
  const [power, setPower] = useState(false);
  const [display, setDisplay] = useState("");

  useEffect(() => {
    document.addEventListener("keydown", logKey);
    function logKey(e) {
      let val = e.key.toUpperCase();
      for (var i = 0; i < drums.length; i++) {
        if (drums[i].key === val) {
          drumPlay(val);
          break;
        }
      }
    }
    return () => document.removeEventListener("keydown", logKey);
  }, [display]);

  const drumPlay = (key) => {
    if (power) {
      setDisplay(key);
      document.getElementById(key).currentTime -= 30;
      document.getElementById(key).play();
    } else {
      setDisplay(display);
    }
  };

  const changePower = () => {
    if (power) {
      setPower(false);
      setDisplay("");
    } else {
      setPower(true);
      setDisplay("PAD ");
    }
  };

  return (
    <div id="drum-machine">
      <div id="keys">
        {drums.map((drum) => {
          return (
            <button
              id={"pad " + drum.key}
              className="drum-pad"
              onClick={() => drumPlay(drum.key)}
            >
              <audio
                id={drum.key}
                autoPlay={false}
                src={drum.sound}
                display="none"
              />
              {drum.key}
            </button>
          );
        })}
      </div>
      <div id="display">
        <h3>POWER</h3>
        <label class="switch">
          <input type="checkbox" id="checkbox" onChange={() => changePower()} />
          <span class="slider"></span>
        </label>
        <p id="current">{display}</p>
      </div>
    </div>
  );
};

export default Drum;
