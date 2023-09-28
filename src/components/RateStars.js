import React from "react";
import { Rate } from "antd";
import "./RateStars.css"

export const RateStars = ({getRatedMovie, setValue}) => (
    <div className="rate">
<Rate
allowHalf
defaultValue={setValue}
count={10}
style={{fontSize:16}}
onChange={(value)=> getRatedMovie(value)}
/>

    </div>
)


