import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  MdMorevertRound,
  MdAddRound,
  MdLocationonOutlined,
  MdEmailOutlined,
  MdModeeditOutlined,
  GiSightDisabled,
  GiKnifeFork,
  HiSolidX,
  BiPhone,
  BiCalendarWeek,
  BiBook,
  LaSpinnerSolid,
} from "oh-vue-icons/icons";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("v-icon", OhVueIcon);
  addIcons(
    MdMorevertRound,
    MdAddRound,
    GiSightDisabled,
    GiKnifeFork,
    HiSolidX,
    MdLocationonOutlined,
    MdEmailOutlined,
    MdModeeditOutlined,
    BiPhone,
    BiCalendarWeek,
    BiBook,
    LaSpinnerSolid,
    // same as GiForkKnifeSpoon but rotated 90 degrees on the svg path level to avoid blurry artifacts
    {
      name: "gi-fork-knife-spoon",
      width: 35,
      height: 35,
      attr: { viewBox: "-35.84 -35.84 444 432" },
      d: "m408.16-35.84h-144c-16 0-32 32-32 32-112 0-176-16-208-16-16 0-32 0-48 16s-16 16 0 32 32 16 48 16c32 0 96-16 208-16 0 0 16 32 32 32h144v-18h-96v-21h96v-18h-96v-21h96zm0 202c0-16-16-16-16-16h-272v0.4c-45.8-4.6-76.8-10.4-96-10.4-16 0-32 0-48 16s-16 16 0 32 32 16 48 16c22.1 0 59.5-7.6 117.5-12.4 30.1 12.3 68.3 22.4 106.5 22.4 48 0 137.6-25.8 160-48zm0 166a96 64 0 0 0-96-64 96 64 0 0 0-92.8 47.9c-104.1-1.1-164.4-15.9-195.2-15.9-16 0-32 0-48 16s-16 16 0 32 32 16 48 16c30.8 0 91.1-14.8 195.1-15.9a96 64 0 0 0 92.9 47.9 96 64 0 0 0 96-64z",
    }
  );
});
