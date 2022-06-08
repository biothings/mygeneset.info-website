<template>
  <AppSection>
    <AppHeading level="2">Use As Guest</AppHeading>

    <p>
      To browse or build genesets as a guest, just go to the browse or build
      pages without logging in. Without an account, you won’t be able to create
      private genesets or edit genesets after you’ve created them.
    </p>

    <AppFlex>
      <AppButton
        to="/browse"
        icon="search"
        text="Browse"
        fill="filled"
        size="big"
      />
      <AppButton
        to="/build"
        icon="hammer"
        text="Build"
        fill="filled"
        size="big"
      />
    </AppFlex>
  </AppSection>
</template>
