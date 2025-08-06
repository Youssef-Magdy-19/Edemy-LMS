import { useEffect } from "react";

/* مهم جدا عشان لما اكون في صفحه وعامل فيها سكورل ودوست علي لينك صفحه تانيه من غير الكود 
هلاقي نفسي لما اروح صفحه تانيه الاقي نفسي في نفس مكان السكرول الكنت فيه وده مينفعش فاستخدمنا
الكود عشان ما اروح لاي صفحه يجبلي الصفحه من اولها*/

const useWindowScrollToTop =()=>{
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
}
export default useWindowScrollToTop