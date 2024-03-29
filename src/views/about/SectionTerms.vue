<template>
  <AppSection>
    <AppHeading level="2" link="terms">Terms of Use</AppHeading>

    <AppFlex direction="col" h-align="left">
      <p>
        BY USING THIS WEBSITE, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD
        AND AGREED TO ALL OF THE FOLLOWING TERMS OF USE.
      </p>
      <p>
        This resource is intended for purely research purposes. It should not be
        used for emergencies or medical or professional advice.
      </p>
      <p>
        This MyGeneset.info website ("MyGeneset.info") has been designed to
        provide you with access to geneset and gene-centric annotation data that
        are maintained by The Scripps Research Institute ("TSRI"). TSRI
        authorizes you to access and use MyGeneset.info and the data and
        information contained on this MyGeneset.info website and database under
        the conditions set forth below.
      </p>
      <template v-if="expanded">
        <p>
          You agree that you will ensure that any copies of documents you
          generate by using MyGeneset.info shall retain and display all
          copyright and other proprietary notices contained therein. TSRI has
          attempted to provide accurate and current information on
          MyGeneset.info. However, TSRI makes no representations or warranties
          that the information contained or published on MyGeneset.info will be
          suitable for your specific purposes or for any other purposes. You
          agree to indemnify, defend, and hold TSRI harmless from all claims,
          damages, liabilities and expenses, including without limitation
          reasonable attorney's fees and costs, whether or not a lawsuit or
          other proceeding is filed, that in any way arise out of or relate to
          your use of MyGeneset.info and/or use of the other third party
          websites referenced herein.
        </p>
        <p>
          ALL INFORMATION AND DATA PROVIDED ON MyGeneset.info IS PROVIDED
          "AS-IS" WITHOUT WARRANTY OF ANY KIND. TSRI MAKES NO REPRESENTATIONS OR
          WARRANTIES CONCERNING MyGeneset.info OR ANY OTHER MATTER WHATSOEVER,
          INCLUDING WITHOUT LIMITATION ANY EXPRESS, IMPLIED OR STATUTORY
          WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
          NON-INFRINGEMENT OF THIRD PARTY RIGHTS, TITLE, ACCURACY, COMPLETENESS
          OR ARISING OUT OF COURSE OF CONDUCT OR TRADE CUSTOM OR USAGE, AND
          DISCLAIMS ALL SUCH EXPRESS, IMPLIED OR STATUTORY WARRANTIES. TSRI
          MAKES NO WARRANTY OR REPRESENTATION THAT YOUR USE OF MyGeneset.info
          WILL NOT INFRINGE UPON THE INTELLECTUAL PROPERTY OR OTHER RIGHTS OF
          ANY THIRD PARTY. FURTHER, TSRI SHALL NOT BE LIABLE IN ANY MANNER
          WHATSOEVER FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
          CONSEQUENTIAL OR EXEMPLARY DAMAGES ARISING OUT OF OR IN ANY WAY
          RELATED TO MyGeneset.info, THE USE OF, OR INABILITY TO USE, ANY OF THE
          INFORMATION OR DATA CONTAINED OR REFERENCED IN THIS WEBSITE OR ANY
          INFORMATION OR DATA THAT IS PROVIDED THROUGH LINKED WEBSITES, OR ANY
          OTHER MATTER. THE FOREGOING EXCLUSIONS AND LIMITATIONS SHALL APPLY TO
          ALL CLAIMS AND ACTIONS OF ANY KIND AND ON ANY THEORY OF LIABILITY,
          WHETHER BASED ON CONTRACT, TORT OR ANY OTHER GROUNDS, AND REGARDLESS
          OF WHETHER A PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH
          DAMAGES, AND NOTWITHSTANDING ANY FAILURE OF ESSENTIAL PURPOSE OF ANY
          LIMITED REMEDY. BY USING THIS WEBSITE, YOU FURTHER AGREE THAT EACH
          WARRANTY DISCLAIMER, EXCLUSION OF DAMAGES OR OTHER LIMITATION OF
          LIABILITY HEREIN IS INTENDED TO BE SEVERABLE AND INDEPENDENT OF THE
          OTHER CLAUSES OR SENTENCES BECAUSE THEY EACH REPRESENT SEPARATE
          ELEMENTS OF RISK ALLOCATION BETWEEN THE PARTIES.
        </p>
        <p>
          MyGeneset.info may contain information from third party websites,
          which may or may not be marked with the name of the source. Such
          information does not necessarily represent the views or opinions of
          TSRI, and TSRI shall have no responsibility whatsoever for such
          information. All information from third party websites are the sole
          responsibility of the person or entity that provides and/or maintains
          such website. As a MyGeneset.info user, you are solely responsible for
          any information that you display, generate, transmit or transfer while
          using MyGeneset.info, and for the consequences of such actions.
        </p>
        <p>
          Should any MyGeneset.info user provide general, scientific, or other
          feedback information, whether in the form of questions, comments, or
          suggestions to TSRI, regarding the content of TSRI's website or
          otherwise, such information shall not be deemed to be confidential or
          proprietary to you or to any other party. TSRI shall have no
          obligation of any kind with respect to such information and TSRI shall
          have the right, without limitation, to reproduce, use, disclose,
          merge, display, make derivatives of and distribute such information to
          others. TSRI shall also have the right, without limitation, to use and
          exploit such information, including ideas, concepts, know-how,
          inventions, techniques or other materials contained in such
          information for any purpose whatsoever, including but not limited to,
          making changes or improvements to MyGeneset.info and/or developing,
          manufacturing, marketing, selling or distributing products and
          technologies incorporating such information. However, you agree that
          TSRI has no obligation whatsoever to respond to your comments or to
          change or correct any information on MyGeneset.info based on your
          comments.
        </p>
        <p>
          TSRI reserves the right to alter the content of MyGeneset.info in any
          way, at any time and for any reason, with or without prior notice to
          you, and TSRI will not be liable in any way for possible consequences
          of such changes or for inaccuracies, typographical errors or omissions
          in the contents hereof. Nothing contained herein shall be construed as
          conferring by implication, estoppel or otherwise any license or right
          under any patent, trademark or other intellectual property of TSRI or
          any third party. Except as expressly provided above, nothing contained
          herein shall be construed as conferring any right or license under any
          TSRI copyrights.
        </p>
        <p>
          TSRI reserves the right to modify these Terms of Use at any time and
          for any reason, with or without prior notice to you. You should always
          review the most current Terms of Use herein before using this website.
          By using this website, you agree to the current Terms of Use posted on
          this site. You also agree that these Terms of Use constitute the
          entire agreement between you and TSRI regarding the subject matter
          hereof and supersede all prior and contemporaneous understandings,
          oral or written, regarding such subject matter. In addition, if any
          provision of these Terms of Use is found by a court of competent
          jurisdiction to be invalid, void or unenforceable, the remaining
          provisions shall remain in full force and effect, and the affected
          provision shall be revised so as to reflect the original intent of the
          parties hereunder to the maximum extent permitted by applicable law.
        </p>
      </template>

      <!-- expand button -->
      <AppButton
        :text="expanded ? 'See less' : 'See more'"
        :icon="expanded ? 'angle-double-up' : 'angle-double-down'"
        @click="expanded = !expanded"
      />
    </AppFlex>
  </AppSection>
</template>

<script setup lang="ts">
import { ref } from "vue";

const expanded = ref(false);
</script>

<style scoped lang="scss">
p:nth-of-type(1),
p:nth-of-type(2) {
  font-weight: $medium;
}
</style>
