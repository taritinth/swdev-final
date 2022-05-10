<template>
  <v-app id="inspire" :style="{ background: 'rgb(115 187 169)' }">
    <v-system-bar app :height="64" :style="{ background: '#f5f5f5' }">
      <div class="w-28">
        <img src=" https://new.reg.kmitl.ac.th/admission/kmitl_logo.png" />
      </div>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-navigation-drawer v-model="drawer" app color="rgba(0,0,0,.2)" :width="338">
      <v-list>
        <v-list-item v-for="[icon, text, active] in links" :key="icon" link :class="{ 'v-list-item--active': active }">
          <v-list-item-icon>
            <v-icon color="#fff">{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title :style="{ color: '#fff' }"> {{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container class="py-8 px-6" fluid>
        <h2 class="text-4xl font-medium text-white">ระบบรับสมัครนักศึกษาระดับปริญญาโท</h2>
        <h2 class="text-4xl font-medium bg-white text-red-600 mb-6" style="color: #ff3c00;">
          สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง</h2>
        <div class=" w-full p-6" :style="{ background: 'rgba(0,0,0,.33)' }">
          <h4 class="text-center text-xl text-white font-semibold">ค้นหาหลักสูตรที่เปิด</h4>

          <v-card class="mt-4 p-6">
            <v-row>
              <v-col cols="4">
                <label>ค้นหา 'คณะ'</label>
                <v-autocomplete deletable-chips multiple small-chips solo></v-autocomplete>
              </v-col>
              <v-col cols="4">
                <label>ค้นหา 'รอบรับสมัคร'</label>
                <v-autocomplete deletable-chips multiple small-chips solo></v-autocomplete>
              </v-col>
              <v-col cols="4">
                <label>ค้นหา 'โครงการ'</label>
                <v-autocomplete deletable-chips multiple small-chips solo></v-autocomplete>
              </v-col>
              <v-col cols="4">
                <label>ค้นหาหลักสูตร ไทย / นานาชาติ</label>
                <v-autocomplete deletable-chips multiple small-chips solo></v-autocomplete>
              </v-col>
            </v-row>
            <!-- <v-row>
              <v-col cols="4">
              </v-col>
            </v-row> -->
            <v-row>
              <v-col cols="12">
                <label>คำค้นหาเพิ่มเติม (Enter เพื่อแยกคำ) [ระบบจะค้นจากชื่อคณะ,หลักสูตร]</label>
                <v-autocomplete deletable-chips multiple small-chips solo></v-autocomplete>
              </v-col>
            </v-row>
          </v-card>

        </div>
        <v-row>
          <v-col v-for="card in cards" :key="card" cols="12">
            <v-card>
              <v-subheader>{{ card }}</v-subheader>
              <v-list two-line>
                <template v-for="n in 6">
                  <v-list-item :key="n">
                    <v-list-item-avatar color="grey darken-1">
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>Message {{ n }}</v-list-item-title>

                      <v-list-item-subtitle>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil repellendus distinctio similique
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider v-if="n !== 6" :key="`divider-${n}`" inset></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    cards: ['Today', 'Yesterday'],
    drawer: null,
    links: [
      ['mdi-book-open-variant', 'คู่มือการใช้งานระบบรับสมัคร', false],
      ['mdi-card-search', 'ค้นหาหลักสูตร | ปริญญาตรี', false],
      ['mdi-card-search', 'ค้นหาหลักสูตร | ปริญญาโท', true],
      ['mdi-card-search', 'ค้นหาหลักสูตร | ปริญญาเอก', false],
      ['mdi-bullhorn', 'รวมประกาศ | ปริญญาตรี', false],
      ['mdi-bullhorn', 'รวมประกาศ | บัณฑิตศึกษา', false],
    ],
  }),
}
</script>