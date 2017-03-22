"use strict";

import Vue from 'vue';
import { Swipe, SwipeItem } from 'mint-ui';
import url1 from "../../images/swiper/index01.png";
import url2 from "../../images/swiper/index02.png";
import url3 from "../../images/swiper/itemPicture1.png";


Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

module.exports = {
    data: function () {
        return {
            main: "this is home page",
            swiper1: url1,
            swiper2: url2,
            swiper3: url3,
        }
    }
}
