import router from "./router"
import pinia from "./store"
import useUserStore from "./store/modules/user"
let useStore = useUserStore(pinia);
router.beforeEach((to,from,next)=>{
  const user = useStore.user;
  if(user && user._id){
    if(to.path === "/login"){
      next({path:"/"})
    }else{
      next()
    }
  }else{
    if(to.path === "/login"){
      next();
    }else{
      next({path:"/login"})
    }
  }
})