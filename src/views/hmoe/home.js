// import homepage from "@/components/homepage/hp.vue";
// import userdata from "@/components/useradmin/user/userdata.vue";
// import advise from "@/components/advise/ad.vue";
// import adminuser from "@/components/useradmin/user/adminuser.vue";
// import admindata from "@/components/useradmin/admin/admindata.vue";
// import manadmin from "@/components/useradmin/admin/manadmin.vue";

export default {
  data() {
    return {
      user: {
        name: "Admin",
        circleUrl:''
      },
      isCollapse: 1,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    open(){
       this.isCollapse = !(this.isCollapse)
    }
  }
};
