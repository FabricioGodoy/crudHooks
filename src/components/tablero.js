import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
/* import { useLocalStorage } from "./useLocalStorage"; */

const URL = `http://localhost:4000/ahoraDoce`;

function Tablero() {
  const [producto, setProducto] = useState([]);
  const obtenerDatos = async () => {
    const datos = await fetch(URL);
    const datosJson = await datos.json();
    setProducto(datosJson);
  };

  useEffect(() => {
    obtenerDatos();
  }, []);
  
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
 
  const [productoSeleccionado, setProductoSeleccionado] = useState({
    id: "",
    alias: "",
    name:"",
  });
  const seleccionarProducto=(elemento, caso)=>{
    setProductoSeleccionado(elemento);
    (caso==='Editar')?setModalEditar(true):setModalEliminar(true)
  }
  
  const handleChange=e=>{
    const {name,value}=e.target;
    setProductoSeleccionado((prevState)=>({
      ...prevState,
      [name]: value,
    }));
  }
  
  const editar=()=>{
    var dataNueva = producto;
    dataNueva.map(articulo=>{
      if(articulo.id===productoSeleccionado.id){
        articulo.alias=productoSeleccionado.alias;
        articulo.name=productoSeleccionado.name;
      }
    });
    setProducto(dataNueva);
    setModalEditar(false);
  }

  const eliminar=()=>{
    setProducto(producto.filter(prod=>prod.id!==productoSeleccionado.id));
    setModalEliminar(false);
  }
  
  const abrirModalInsertar = () =>{
    setProductoSeleccionado(null);
    setModalInsertar(true)
  }
  
  const insertar=()=>{
    var valorInsertar=productoSeleccionado;
    valorInsertar.id=producto[producto.length-1].id+1;
    var productoNuevo= producto;
    productoNuevo.push(valorInsertar);
    setProducto(productoNuevo);
    setModalInsertar(false);
    saveData
  }


  /* codigo local storage */
  const [saveData, setSaveData] = useState(false)
    const datos  = () => {
  localStorage.setItem('producto', productoSeleccionado)
  setSavedData(true)
 }
 
 console.log(localStorage.productoData)
  
  return (
    <div>
      <h2> DASHBOARD </h2>
      <br/>
      <button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Insertar</button>
      <br/><br/>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID:</th>
            <th>SKU:</th>
            <th>Name:</th>
            <th>Action:</th>
          </tr>
        </thead>
        <tbody>
          {producto.map((elemento) => (
            <tr key={elemento.id}>
              <td>{elemento.id}</td>
              <td>{elemento.alias}</td>
              <td>{elemento.name}</td>
              <td>
                <button className="btn btn-primary" onClick={()=>seleccionarProducto(elemento,'Editar')}> Editar</button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>seleccionarProducto(elemento,'Eliminar')}> Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar producto</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input className="form-control inputGuardar" readOnly type="text" name="id" value={productoSeleccionado&&productoSeleccionado.id}/>
            <br/>
            <label>SKU</label>
            <input className="form-control inputGuardar" type="text" name="alias" defaultValue={productoSeleccionado&&productoSeleccionado.alias} onChange={handleChange}/>
            <br/>
            <label>NAME</label>
            <input className="form-control inputGuardar" type="text" name="name" defaultValue={productoSeleccionado&&productoSeleccionado.name} onChange={handleChange}/>
            <br/>
          </div>
        </ModalBody>
        <ModalFooter>
            <button className="btn btn-primary" onClick={()=>editar()} >Actualizar</button>
            <button className="btn btn-danger" onClick={()=>setModalEditar(false)}>cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
          <ModalBody>
            ¿Estás seguro que deseas eliminar el producto {productoSeleccionado&&productoSeleccionado.alias}?
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={()=>eliminar()}>
              Sí
            </button>
            <button className="btn btn-danger" onClick={()=>setModalEliminar(false)}>
              No
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modalInsertar}>
          <ModalHeader>
            <div>
              <h3> Agregar Producto</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>ID:</label>
              <input className="form-control inputGuardar" readOnly type='text' name="id" value={producto.length+1} />
              <br/>
              <label>SKU:</label>
              <input className="form-control inputGuardar" type='text' name="alias" placeholder="SKU producto" value={productoSeleccionado?productoSeleccionado.alias:''} onChange={handleChange}/>
              <br/>
              <label>Name:</label>
              <input className="form-control inputGuardar" type='text' name="name" placeholder="Nombre producto" value={productoSeleccionado?productoSeleccionado.name:''} onChange={handleChange}/>
              <br/>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={()=>insertar()}>Insertar </button>
            <button className="btn btn-danger" onClick={()=>setModalInsertar(false)}>Cancelar </button>
          </ModalFooter>
        </Modal>
    </div>
  );
}

export default Tablero;
