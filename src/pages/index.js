import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react'
import Modal from '../../components/Modal/Modal'
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [isOpen, setIsOpen] = useState(false)
  const [localData, setLocalData] = useState([])
  const [total, setTotal] = useState(0)
  const [nutsAmount, setNutsAmount] = useState(null)
  const [nutsNoOfPeople, setNutsNoOfPeople] = useState(null)
  const [nutsTotal, setNutsTotal] = useState(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      amount: null
    }
  });

  const animations = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  }

  const Logo = (props) => {
    return (
      <svg
      height="1.6em"
      width="1.6em"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
      {...props}
    >
      <path
        style={{
          fill: "#d7deed",
        }}
        d="M425.634 260.414a65.903 65.903 0 0 0-20.288 3.209 1082.094 1082.094 0 0 0 2.013-24.375c.373-5.291-3.682-9.729-8.81-9.729h-87.673v264.828h7.019c23.265 0 40.714-24.575 53.732-58.748 57.975-12.295 120.213-58.643 120.213-108.977.001-36.51-29.697-66.208-66.206-66.208zm-19.103 134.389c-9.82 5.132-21.299-3.519-18.859-14.326 5.331-23.614 9.347-48.019 12.341-70.153 1.736-12.833 12.266-23.29 25.216-23.425l.395-.002c8.736-.002 17.012 3.886 23.735 9.465 37.725 31.303 2.733 74.631-42.828 98.441z"
      />
      <path
        style={{
          fill: "#eff2fa",
        }}
        d="M226.87 35.31a8.828 8.828 0 0 1-7.616-13.276c2.28-3.914 3.345-8.108 3.345-13.207a8.829 8.829 0 0 1 17.656 0c0 8.242-1.879 15.47-5.75 22.103a8.829 8.829 0 0 1-7.635 4.38z"
      />
      <path
        style={{
          fill: "#e4eaf6",
        }}
        d="M196.116 211.862a8.829 8.829 0 0 1-8.828-8.828c0-20.061 11.38-30.487 20.518-38.862 8.267-7.573 14.793-13.551 14.793-25.845 0-12.306-6.53-18.289-14.793-25.866-9.142-8.384-20.518-18.815-20.518-38.883 0-9.725 2.659-18.151 8.129-25.763 2.845-3.957 8.366-4.857 12.319-2.017a8.825 8.825 0 0 1 2.017 12.319c-3.328 4.629-4.81 9.397-4.81 15.462 0 12.306 6.53 18.289 14.793 25.866 9.142 8.384 20.518 18.815 20.518 38.883 0 20.061-11.38 30.487-20.518 38.862-8.267 7.573-14.793 13.551-14.793 25.845a8.827 8.827 0 0 1-8.827 8.827z"
      />
      <path
        style={{
          fill: "#eff2fa",
        }}
        d="M252.111 97.133a8.83 8.83 0 0 1-8.03-5.16c-2.578-5.63-3.828-11.647-3.828-18.397a8.829 8.829 0 0 1 17.656 0c0 4.163.728 7.78 2.225 11.052 2.03 4.436.082 9.673-4.353 11.699a8.764 8.764 0 0 1-3.67.806z"
      />
      <path
        style={{
          fill: "#e4eaf6",
        }}
        d="M249.081 211.862a8.829 8.829 0 0 1-8.828-8.828c0-20.061 11.38-30.487 20.518-38.862 8.267-7.573 14.793-13.551 14.793-25.845 0-7.009-1.992-12.332-6.655-17.802a8.824 8.824 0 0 1 .988-12.444c3.699-3.172 9.276-2.733 12.444.988 7.423 8.698 10.879 17.996 10.879 29.259 0 20.061-11.379 30.487-20.518 38.862-8.267 7.573-14.793 13.551-14.793 25.845a8.828 8.828 0 0 1-8.828 8.827z"
      />
      <path
        style={{
          fill: "#eff2fa",
        }}
        d="M146.185 97.138a8.827 8.827 0 0 1-8.03-5.151c-2.578-5.63-3.832-11.651-3.832-18.41a8.829 8.829 0 0 1 17.656 0c0 4.168.728 7.785 2.229 11.057 2.03 4.431.082 9.673-4.349 11.702a8.766 8.766 0 0 1-3.674.802z"
      />
      <path
        style={{
          fill: "#e4eaf6",
        }}
        d="M143.15 211.862a8.829 8.829 0 0 1-8.828-8.828c0-20.061 11.38-30.487 20.518-38.862 8.267-7.573 14.793-13.551 14.793-25.845 0-7.026-2.004-12.366-6.698-17.849-3.168-3.706-2.737-9.28.966-12.448 3.702-3.164 9.28-2.733 12.448.966 7.466 8.724 10.94 18.044 10.94 29.332 0 20.061-11.38 30.487-20.518 38.862-8.267 7.573-14.793 13.551-14.793 25.845a8.828 8.828 0 0 1-8.828 8.827z"
      />
      <path
        style={{
          fill: "#d7deed",
        }}
        d="M306.462 512h-185.38c-7.313 0-13.241-5.929-13.241-13.241v-13.241h211.862v13.241c0 7.312-5.929 13.241-13.241 13.241z"
      />
      <path
        style={{
          fill: "#c7cfe2",
        }}
        d="M213.772 498.759v-13.241H107.841v13.241c0 7.313 5.929 13.241 13.241 13.241h105.931c-7.313 0-13.241-5.929-13.241-13.241z"
      />
      <path
        style={{
          fill: "#e4eaf6",
        }}
        d="M28.995 229.517c-5.128 0-9.184 4.439-8.811 9.73 3.369 47.759 21.882 255.097 89.464 255.097h208.246c67.582 0 86.095-207.338 89.464-255.097.373-5.291-3.682-9.73-8.811-9.73H28.995z"
      />
      <path
        style={{
          fill: "#d7deed",
        }}
        d="M153.187 239.246c-.254-5.291 2.507-9.729 5.998-9.729H28.995c-5.128 0-9.183 4.438-8.81 9.729 3.368 47.761 21.881 255.098 89.463 255.098h104.449c-46.012.001-58.616-207.337-60.91-255.098z"
      />
    </svg>
    )
  }

  const clear = () => {
    if (!localStorage.getItem('items')) {
      return
    }
    localStorage.removeItem('items')
    setLocalData([])
  }

  const close = () => {
    setIsOpen(false)
    reset()
  }

  const toggle = () => setIsOpen(!isOpen);

  const handleNutsAmount = (e) => {
    setNutsAmount(e.target.value)
  }

  const handleNutsNoOfPeople = (e) => {
    setNutsNoOfPeople(e.target.value)
  }

  useEffect(() => {
    if (nutsAmount && nutsNoOfPeople) {
      const tot = (nutsAmount / nutsNoOfPeople).toFixed(2)
      setNutsTotal(tot)
    }
  }, [nutsAmount, nutsNoOfPeople])

  const storeInLocalStorage = (item, keyAndValue) => {
    let data = localStorage.getItem('items');
    data = data ? JSON.parse(data) : []
    data.push(keyAndValue)

    localStorage.setItem(item, JSON.stringify(data))
    setLocalData(data)
  }

  const onSubmit = (data, e) => {
    data.tax = data.amount ? (data.amount * 1.18 + parseFloat(nutsTotal)).toFixed(2) : 0
    storeInLocalStorage('items', data)
    e.target.reset()
    close()
  };

  useEffect(() => {
    let didCancel = false
    const data = JSON.parse(localStorage.getItem('items'));

    async function setData() {
      if (!didCancel) {
        if (data && data.length > 0) {
          setLocalData(data)
          const totalAmount = data.reduce((total, item) => {
            return total + Number(item.amount)
          }, 0)
          setTotal(totalAmount)
        }
      }
    }

    setData()

    return () => {
      didCancel = true
    }
  }, [])

  useEffect(() => {
    let didCancel = false

    async function setAmount() {
      if (!didCancel) {
        const data = JSON.parse(localStorage.getItem('items'));
        if (data && data.length > 0) {
          const totalAmount = data.reduce((total, item) => {
            return total + Number(item.tax)
          }, 0)
          setTotal(totalAmount.toFixed(2))
        }
      }
    }

    setAmount()

    return () => {
      didCancel = true
    }
  }, [localData])

  return (
    <>
      <Head>
        <title>Bill Calculator</title>
        <meta name="description" content="Bill Calculator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/icon-192x192.png" />
      </Head>
      <nav className='bg-white shadow p-4 sticky top-0'>
        <div className='container mx-auto sm:px-6 lg:px-8 flex'>
          <div className='flex-1'><Logo /></div>
          <div></div>
          <div><button className='btn-primary' onClick={() => toggle()}>Add Item</button></div>
        </div>
      </nav>
      <main className="container mt-4 mx-auto sm:px-6 lg:px-8">
        <div className='bg-white my-6 mx-4 md:mx-0 md:flex items-end'>
          <div className='w-full my-2 md:w-1/2'>
            <h2 className='text-xl font-medium leading-6'>Water & nuts</h2>
            <div className="flex space-x-4 mt-2">
              <div>
                <label htmlFor="title" className="input-label-xs">Amount</label>
                <input className="input-text" value={nutsAmount == null ? '' : nutsAmount} step=".01" onChange={handleNutsAmount} type="number" name="amount" id="amount" />
              </div>
              <div>
              <label htmlFor="title" className="input-label-xs">No. of People</label>
              <input className='input-text' value={nutsNoOfPeople == null ? '' : nutsNoOfPeople} onChange={handleNutsNoOfPeople} type="number" name="no_of_people" id="no_of_people" />
              </div>
              <div>
              <label htmlFor="title" className="input-label-xs">Value</label>
              <input className='input-text' value={nutsTotal == null ? '' : nutsTotal} onChange={(e) => console(e.target.value)} type="number" name="total" id="total" disabled="disabled" />
              </div>
            </div>
          </div>
          <div className='flex justify-end w-full md:w-1/2'>
            <button className='btn-secondary' onClick={clear}>Clear</button>
          </div>
        </div>
        {localData && localData.length > 0 && (
          <div className="overflow-hidden rounded-md bg-white shadow pt-5 pb-5 px-4">
            <div className='flex justify-between mb-1 px-1 py-2 text-gray-900 text-xs font-medium bg-gray-100'>
              <div className='w-52'>Title</div>
              <div className='w-14'>Amount</div>
              <div className='w-14'>T Amount</div>
            </div>
            <ul role="list" className="space-y-3">
              {localData && localData.map((item) =>
                <li key={item.title} className="overflow-hidden bg-white px-4 py-4 shadow text-gray-500 text-md sm:rounded-md sm:px-6">
                  <motion.div className='flex justify-between' {...animations}>
                    <div className='w-64'>{item.title && item.title}</div>
                    <div className='w-14'>{item.amount && item.amount}</div>
                    <div className='w-14 font-semibold text-right'>{item.tax && item.tax}</div>
                  </motion.div>
                </li>
              )}
            </ul>
            <div className='flex mt-6 justify-end'>Total:&nbsp;<strong>{total}</strong></div>
          </div>
        )}
      </main>
      <Modal title="Add Item" isOpen={isOpen} onClose={close}>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col'>
          <div className='w-full'>
            <label htmlFor="title" className="input-label">Title</label>
            <div className="mt-2">
              <input
                type="text"
                name="title"
                id="title"
                className="input-text"
                {...register("title", { required: true})}
              />
              {errors.title && errors.title.type === "required" && (
                <p className="text-sm text-red-500">Title is required.</p>
              )}
            </div>
          </div>
          <div className='w-full py-2'>
            <label htmlFor="amount" className="input-label">Amount</label>
            <div className="mt-2">
              <input
                type="number"
                name="amount"
                id="amount"
                step=".01"
                className="input-text"
                {...register("amount", { required: true})}
                />
              {errors.amount && errors.amount.type === "required" && (
                <p className="text-sm text-red-500">Amount is required.</p>
                )}
            </div>
          </div>
          <div className='flex justify-end w-full border-t mt-4 pt-3'>
            <button className='btn-secondary mr-2' onClick={() => close()}>Cancel</button>
            <button className='btn-primary' type='submit'>Save</button>
          </div>
        </div>
        </form>
      </Modal>
    </>
  )
}
