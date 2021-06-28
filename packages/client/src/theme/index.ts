import { extendTheme } from "@chakra-ui/react";

const config = {
  colors: {
    purple: {
      "50": "#E5EEFF",
      "100": "#B8D0FF",
      "200": "#8AB1FF",
      "300": "#5C93FF",
      "400": "#2E74FF",
      "500": "#0056FF",
      "600": "#0045CC",
      "700": "#003399",
      "800": "#002266",
      "900": "#001133",
    },
  },
};

export default extendTheme(config);
export * from "./icons";
