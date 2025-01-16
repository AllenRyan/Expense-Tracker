'use client'
import { useRef } from "react";
import addTransaction from "@/app/actions/addTransaction";
import { toast } from "react-toastify";
const AddTransaction = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const clientAction = async (formData: FormData) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {data, error} = await addTransaction(formData);

        if (error) {
            toast.error(error)
        } else {
            toast.success('Transaction Added')
            formRef.current?.reset()
        }
    }
    return ( 
        <>
        <h3>Add Transaction</h3>
        <form action={clientAction} ref={formRef}>
        <div className='form-control'>
            <label htmlFor="text">Text</label>
            <input type="text" id="text" name="text" placeholder="Enter text..." />
        </div>
        <div className='form-control'>
            <label htmlFor="amount">Amount <br /> (negetive - expense, positive - income) </label>
            <input type="number" id="amount" name="amount" placeholder="Enter Amount..." step="0.01"/>
        </div>
        <button className="btn">Add transaction</button>
        </form>
        </>
     );
}
 
export default AddTransaction;