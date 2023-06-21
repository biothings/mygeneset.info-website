<template>
  <AppSection>
    <AppHeading level="2" link="support">Support Us</AppHeading>

    <!-- grants -->
    <p>
      The tools created by the BioThings collaboration are funded by grants from
      the
      <AppLink to="https://www.genome.gov/"
        >National Human Genome Research Institute</AppLink
      >
      (R01 HG010067), the
      <AppLink to="https://www.nigms.nih.gov/"
        >National Institute of General Medical Sciences</AppLink
      >
      (R01 GM083924), the
      <AppLink to="https://ncats.nih.gov/translator"
        >National Center for Advancing Translational Sciences</AppLink
      >
      (OT2TR003445), and the
      <AppLink to="https://www.moore.org/"
        >Gordon and Betty Moore Foundation</AppLink
      >
      (GBMF 4552). Although the individual data sources included in these tools
      may be subject to restrictions, the tools themselves are free and we would
      like them to remain that way. If you found our tools useful, please help
      support us by spreading the word and demonstrating its value:
    </p>

    <!-- share/follow actions -->
    <AppFlex>
      <AppButton
        to="https://biothings.io/branding"
        text="“Powered by” Branding"
        fill="filled"
      />
      <AppButton to="#cite" text="Cite Us" fill="filled" />
    </AppFlex>
    <AppFlex class="buttons">
      <AppLink
        to="https://twitter.com/mygenesetinfo?ref_src=twsrc%5Etfw"
        class="twitter-follow-button"
        data-size="large"
        data-show-count="false"
        >Follow @mygenesetinfo</AppLink
      >
      <component
        :is="'script'"
        async
        src="https://platform.twitter.com/widgets.js"
        charset="utf-8"
        type="application/javascript"
      ></component>
      <AppLink
        class="github-button"
        to="https://github.com/biothings"
        data-size="large"
        data-show-count="true"
        aria-label="Follow @biothings on GitHub"
        >Follow @biothings</AppLink
      >
      <AppLink
        class="github-button"
        to="https://github.com/biothings/mygeneset.info"
        data-size="large"
        data-show-count="true"
        aria-label="Star biothings/mygeneset.info on GitHub"
        >Star</AppLink
      >
      <component
        :is="'script'"
        async
        defer
        src="https://buttons.github.io/buttons.js"
      ></component>
    </AppFlex>
  </AppSection>
</template>

<style scoped lang="scss">
.buttons {
  & > span {
    height: 27px;
  }
}
</style>
