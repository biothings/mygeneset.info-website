import AppButton from "@/components/AppButton.vue";
import AppFlex from "@/components/AppFlex.vue";
import AppHeading from "@/components/AppHeading.vue";
import AppIcon from "@/components/AppIcon.vue";
import AppLink from "@/components/AppLink.vue";
import AppSection from "@/components/AppSection.vue";

// list of components we want to be available in any vue file without importing
// only include components used very repetitively
const globalComponents = {
  AppButton,
  AppFlex,
  AppHeading,
  AppIcon,
  AppLink,
  AppSection,
};

export default globalComponents;

// typescript hints so editors can warn when you haven't supplied props properly
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    AppButton: typeof AppButton;
    AppFlex: typeof AppFlex;
    AppHeading: typeof AppHeading;
    AppIcon: typeof AppIcon;
    AppLink: typeof AppLink;
    AppSection: typeof AppSection;
  }
}
