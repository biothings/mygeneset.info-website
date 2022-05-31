<template>
  <AppSection>
    <AppHeading level="2">Contact</AppHeading>

    <div class="grid">
      <AppButton
        to="mailto:biothings@googlegroups.com"
        icon="envelope"
        text="Email Us"
        design="slim"
      />
      <span
        >Write us at
        <AppLink to="mailto:biothings@googlegroups.com"
          >biothings@googlegroups.com</AppLink
        ></span
      >
      <AppButton
        to="https://github.com/biothings/mygeneset.info/"
        icon="github"
        text="Bug Us"
        design="slim"
      />
      <span
        >Report bugs and request features on
        <AppLink to="https://github.com/biothings/mygeneset.info"
          >GitHub</AppLink
        ></span
      >
      <AppButton
        to="https://twitter.com/mygenesetinfo/"
        icon="twitter"
        text="Tweet Us"
        design="slim"
      />
      <span
        >Ask us a question on
        <AppLink to="https://twitter.com/mygenesetinfo/">Twitter</AppLink></span
      >
      <AppButton
        to="https://biostars.org/"
        icon="comment"
        text="Ask Us"
        design="slim"
      />
      <span
        >Post a question on
        <AppLink to="https://www.biostars.org/">biostars.org</AppLink>
        with the tag #mygeneset</span
      >
    </div>
  </AppSection>
</template>

<style scope lang="scss">
$breakpoint: 500px;

.grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  justify-items: stretch;
  align-items: center;
  text-align: left;

  @media (max-width: $breakpoint) {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
</style>
