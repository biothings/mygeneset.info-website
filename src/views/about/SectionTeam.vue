<template>
  <AppSection>
    <AppHeading level="2">Team</AppHeading>

    <p>
      MyGeneset was made by the
      <AppLink to="https://biothings.io/">BioThings collaboration</AppLink>, a
      cross-organization group that builds
      <AppLink to="https://www.go-fair.org/fair-principles/">FAIR</AppLink>
      tools for biomedical knowledge. This specific tool was made possible
      thanks to these contributors.
    </p>
    <AppGallery>
      <AppLink
        v-for="(member, index) in members"
        :key="index"
        :to="member.link"
        class="portrait"
      >
        <AppFlex direction="col" gap="small">
          <img
            class="image"
            :src="require(`@/assets/team/${member.image}.jpg`)"
          />
          <div class="name">{{ member.name }}</div>
          <div class="role">{{ member.role }}</div>
        </AppFlex>
      </AppLink>
    </AppGallery>
  </AppSection>
</template>

<script setup lang="ts">
import AppGallery from "@/components/AppGallery.vue";

const members = [
  {
    name: "Chunlei Wu",
    role: "Principal Investigator",
    link: "https://wulab.io/the-team-chunlei-wu",
    image: "chunlei",
  },
  {
    name: "Casey Greene",
    role: "Principal Investigator",
    link: "https://greenelab.com/members/casey-greene.html",
    image: "casey",
  },
  {
    name: "Ricardo Avila",
    role: "Research Programmer",
    link: "https://wulab.io/the-team-ricardo-avila",
    image: "ricardo",
  },
  {
    name: "Vincent Rubinetti",
    role: "Frontend Developer",
    link: "https://greenelab.com/members/vincent-rubinetti.html",
    image: "vince",
  },
  {
    name: "Dongbo Hu",
    role: "Backend Developer",
    link: "https://github.com/dongbohu",
    image: "dongbo",
  },
  {
    name: "Xinghua (Jerry) Zhou",
    role: "Research Programmer",
    link: "https://wulab.io/the-team-jerry-zhou",
    image: "jerry",
  },
];
</script>

<style scoped lang="scss">
.portrait {
  text-decoration: none;
  color: $black;

  &:hover {
    color: $theme;
  }
}

.image {
  width: 150px;
  height: 150px;
  border-radius: 75px;
  margin-bottom: 5px;
}

.name {
  font-weight: $medium;
}
</style>
