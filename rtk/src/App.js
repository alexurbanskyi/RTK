import {useState} from 'react'
import {useAddCarMutation, useGetCarQuery, useDeleteCarMutation } from './redux/carApi'
import './App.css';

function App() {
  const [count, setCount] = useState('')
  const [newCar, setNewCar] = useState('')
  const {data, isLoading} = useGetCarQuery(count);
  const [addCar, {isSuccess}] = useAddCarMutation();
  const [deleteCar] = useDeleteCarMutation();
  
  const handleAddCar = async() => {
    if (newCar) {
      await addCar({name: newCar}).unwrap();
      setNewCar('')
    }
  }

  const handleDeleteCar = async (id) => {
    await deleteCar(id).unwrap();
  }
  
  if (isLoading) return <h1>LOADING...</h1>
     
  return (
    <div className="App">
      <span>SHOW CAR </span>
      <select value={count} onChange={(e) => setCount(e.target.value)}>
        <option value={''}>all</option>
        <option value={'1'}>1</option>
        <option value={'2'}>2</option>
        <option value={'3'}>3</option>
      </select>
      <div>
        <input
          type='text'
          value={newCar}
          onChange={(e) => setNewCar(e.target.value)}
        />
      </div>
      <button onClick={handleAddCar}>ADD NEW CAR</button>
      <ul>
        {data.map(item => <li key={item.id} onClick={() => handleDeleteCar(item.id)}>{item.name}</li>)}
      </ul>
    
    </div>
  );
}

export default App;
