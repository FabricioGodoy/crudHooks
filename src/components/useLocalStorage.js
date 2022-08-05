window.addEventListener("load", function useLocalStorage(){

    if (localStorage.getItem("productos") == nul){
        let product = document.querySelector(".inputGuardar")
        this.localStorage.setItem("productos", product);

    } else {
        let product = this.localStorage.getItem("productos");
        document.querySelector(".inputGuardar").innerHTML = "guardado"
    }

    console.log(localStorage.productoData)
})
export default useLocalStorage