import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from 'react-hook-form';
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const img_hosting_token = import.meta.env.VITE_Image_Upload_token; 


const AddItem = () => {
    const [axiosSecure] = useAxiosSecure()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const img_hosting_URL = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`

    const onSubmit = data => {
       
        const formData = new FormData()
        formData.append('image', data.image[0])
        fetch(img_hosting_URL, {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(imgResponse =>{
            if(imgResponse.success){
                const imgURL = imgResponse.data.display_url;
                const {name, price, category, recipe} = data;
                const newItem = {name, price: parseFloat(price), category, recipe, image: imgURL};
                console.log(newItem);
                axiosSecure.post('/menu', newItem)
                .then(data => {
                    console.log('After posting new mwnu item', data.data);
                    if(data.data.insertedId){
                        alert('Successfylly Added');
                        reset();
                    }
                })
            }
        })

    };
    console.log(errors);

    return (
        <div className="w-full px-14">
            <SectionTitle subHeading={"What's New"} heading={"Add an item"}></SectionTitle>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-slate-300 p-6 rounded-md">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Recipe Name*</span>
                    </label>
                    <input type="text" placeholder="Recipe name" 
                    {...register("name", {required: true, maxLength: 120})}className="input input-bordered w-full" />
                </div>


                <div className="flex flex-row justify-between">
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Category*</span>
                        </label>
                        <select defaultValue={"Pick One"} {...register("category", { required: true })} className="select select-bordered">
                            <option disabled>Pick One</option>
                            <option>Pizza</option>
                            <option>Soup</option>
                            <option>Salad</option>
                            <option>Dessert</option>
                            <option>Drinks</option>
                        </select>
                    </div>


                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Price*</span>
                        </label>
                        <input type="number" {...register("price", { required: true })} placeholder="Price" className="input input-bordered w-full max-w-xs" />
                    </div>
                </div>


                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Recipe Details</span>
                    </label>
                    <textarea {...register("recipe", { required: true })} className="textarea textarea-bordered h-24" placeholder="Details"></textarea>
                </div>


                <div className="flex justify-between items-center">
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Item Image*</span>
                        </label>
                        <input {...register("image", { required: true })} type="file" className="file-input file-input-bordered w-full max-w-xs" />
                    </div>

                    <input type="submit" className="btn btn-md mt-8" value="Add Item" />
                </div>
            </form>
        </div>
    );
};

export default AddItem;