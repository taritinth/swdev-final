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
        <div class=" w-full p-6 bg-white">
          <h4 class="text-2xl font-meidum">ผลการค้นหา : 179 รายการ</h4>
        </div>
        <div class=" w-full p-6 " style="background:hsla(0,0%,100%,.67)">
          <h1 class="text-4xl font-semibold">กทม.</h1>
          <span class="text-red-600">หมายเหตุ <br>
            กรณีเปลี่ยนสาขาวิชาที่สมัครหรืออันดับหรือโครงการที่สมัคร ต้องสมัครใหม่ และชำระเงินค่าสมัครใหม่เท่านั้น
            โดยสถาบันฯ จะถือว่าการสมัครครั้งสุดท้ายที่มีการชําระเงินค่าสมัครเรียบร้อยแล้วเป็นครั้งที่ต้องการเข้าสอบ
            และครั้งที่สมัครก่อนหน้าจะถือเป็นโมฆะ แม้ว่าจะชําระเงินค่าสมัครแล้วก็ตาม</span>
          <v-row>
            <v-col v-for="card in cards" :key="card" cols="12">
              <v-card>
                <v-card-title>
                  <h3> หลักสูตร : การจัดการความปลอดภัยอาหาร
                    <div> แผนการศึกษา : แผน ก2 <span>|</span> ช่วงเวลาเรียน : ปกติ <span><span>|</span> เฉพาะ : </span>
                    </div>
                  </h3>
                </v-card-title>
                <v-card-text>
                  <v-chip class="mr-1 mt-1" color="orange darken-3" text-color="white" small>
                    1 /2565
                  </v-chip>
                  <v-chip class="mr-1 mt-1" color="red" text-color="white" small>
                    รอบ 1 -
                    รับสมัครประจำภาคการศึกษา
                  </v-chip>
                  <v-chip class="mr-1 mt-1" color="deep-purple" text-color="white" small>
                    โครงการ
                    รับเข้า 1/2565 คณะอุตสาหกรรมอาหาร (โครงการแววนวัตกร)
                  </v-chip>
                  <h3 lass="deep-orange--text"> คณะ อุตสาหกรรมอาหาร </h3>
                  หลักสูตร : การจัดการความปลอดภัยอาหาร / Food Safety Management <br>
                  <h3> วันที่เปิดรับสมัคร : <span class="light-blue--text text--darken-4">22 กุมภาพันธ์ 2022 - 10
                      มิถุนายน 2022 </span></h3>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="blue" dark large text-color="white">
                    สมัคร
                  </v-btn>
                  <v-btn color="deep-purple" dark large text-color="white">
                    ประกาศรับสมัคร
                  </v-btn>
                  <v-btn color="red" dark large text-color="white">
                    คุณสมบัติผู้สมัคร
                  </v-btn>

                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </div>


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