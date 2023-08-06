const fs =require("fs")

class ProductManager{
    constructor(path){
        this.#path=path,
        this.products=[  
        ]
    }

    getProducts=async()=>{
    const productlist= await fs.promises.readFile(this.#path,"utf-8")
    const productlistparse=JSON.parse(productlist)
    return productlistparse
    }
    
    generateId=async()=>{
        const counter=this.products.length
        if(counter==0){
            return 1
        }
        else{
            return (this.products[counter-1].id)+1
        }
    }

    addProduct=async(title,description,price,thumbnail,code,stock)=>{
        if(!title || !description || !price || !thumbnail|| !code||!stock){
        console.error("INGRESE TODOS LOS DATOS DEL PRODUCTO")
        return 
        }
        else{
        const codigorepetido=this.products.find(elemento=>elemento.code===code)
        if(codigorepetido){
            console.error("EL CODIGO DEL PRODUCTO QUE DESEA AGREGAR ES REPETIDO")
            return
        }
        else{
            const id=await this.generateId()
            const productnew={
                id,title,description,price,thumbnail,code,stock
            }
            this.products.push(productnew)
            await fs.promises.writeFile(this.#path,JSON.stringify(this.products,null,2))
        }
      }
    }

    pdateProduct=async(id,title,description,price,thumbnail,code,stock)=>{
        if(!id|| !title || !description || !price || !thumbnail|| !code||!stock){
            console.error("INGRESE TODOS LOS DATOS DEL PRODUCTO PARA SU ACTUALIZACION")
            return 
        }
        else{
            const allproducts=await this.getProducts()
            const codigorepetido=allproducts.find(elemento=>elemento.code===code)
            if(codigorepetido){
                console.error("EL CODIGO DEL PRODUCTO QUE DESEA ACTUALIZAR ES REPETIDO")
                return
            }
            else{
                const currentProductsList=await this.getProducts()
                const newProductsList=currentProductsList.map(elemento=>{
                    if(elemento.id===id){
                        const updatedProduct={
                        ...elemento,
                        title,description,price,thumbnail,code,stock
                        }
                        return updatedProduct
                    }
                    else{
                        return elemento
                    }
                })
                await fs.promises.writeFile(this.#path,JSON.stringify(newProductsList,null,2))
            }
            
        }
    }

    deleteProduct=async(id)=>{
        const allproducts=await this.getProducts()
        const productswithoutfound=allproducts.filter(elemento=>elemento.id!==id)
        await fs.promises.writeFile(this.#path,JSON.stringify(productswithoutfound,null,2))
    }
    getProductbyId=async(id)=>{
        const allproducts=await this.getProducts()
        const found=allproducts.find(element=>element.id===id)
        return found
    }
}

async function generator(){

const productmanager=new ProductManager("./files/products.json");

/* productos.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
productos.addProduct("producto prueba2", "Este es un producto prueba", 250, "Sin imagen", "abc123", 25); 
productos.addProduct("producto prueba3", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);  
productos.addProduct("producto prueba4", "Este es un producto prueba", 1000, "Sin imagen", "abc123", 25);  
productos.addProduct("producto prueba5", "Este es un producto prueba", 2900, "Sin imagen", "abc123", 25);  
productos.addProduct("producto prueba6", "Este es un producto prueba", 300, "Sin imagen", "abc123", 25);  
productos.addProduct("producto prueba7", "Este es un producto prueba", 123, "Sin imagen", "abc123", 25);  
productos.addProduct("producto prueba8", "Este es un producto prueba", 9820, "Sin imagen", "abc123", 25);  
productos.addProduct("producto prueba9", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);  
productos.addProduct("producto prueba10", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);  */

const solo=await productmanager.getProductbyId(1)

//  const listado=await productmanager.getProducts()
console.log(solo)
}

generator()