import { useState } from "react"
import { createProduct } from "../../redux/api.call";

const FormElectroinc=()=>{
    const user =  JSON.parse(window.localStorage.getItem('user'));
    const [product_name,setproduct_name] = useState('');
    const [product_dicription,setproduct_dicription] = useState('');
    const [product_price,setproduct_price] = useState('');
    const [product_sold,setproduct_sold] = useState('');
    const [product_quantity,setproduct_quantity] = useState('');
    const [product_rating,setproduct_rating] = useState('');
    const [connection_type,setconnection_type] = useState('');
    const [sent_from,setsent_from] = useState('');
    const [brand,setbrand] = useState('');
    const [guarantee,setguarantee] = useState('');
    const [avata,setavata] = useState(null);
    return(
    <form  id="form" encType="multipart/form-data" onSubmit={async(e)=>{
        e.preventDefault();
        const fomdata = new FormData();
        fomdata.append('product_name',product_name);
        fomdata.append('product_dicription',product_dicription);
        fomdata.append('product_price',product_price);
        fomdata.append('product_sold',product_sold);
        fomdata.append('product_user',user.user._id);
        fomdata.append('product_rating',product_rating);
        fomdata.append('product_quantity',product_quantity);
        fomdata.append('product_type','electroinc');
        fomdata.append('product_atrributes[guarantee]',guarantee);
        fomdata.append('product_atrributes[sent_from]',sent_from);
        fomdata.append('product_atrributes[connection_type]',connection_type);
        fomdata.append('product_atrributes[brand]',brand);
        fomdata.append('product_atrributes[thumb_detail]',' ');
        fomdata.append('product_atrributes[user_id]',user.user._id);
        console.log(avata)
        for(let i = 0;i<avata.length;i++){
            fomdata.append('avata',avata[i]);
           }
        
        const newprouct = await createProduct(fomdata);

    }}>
        <h2>tạo sản phẩm </h2>
        <table>
            <tr>
                <td> 
                   <span>tên sản phẩm</span>
                </td>
                <td>
                     <input type="text" id="product_name" required onChange={(e=>{
                        setproduct_name(e.target.value)
                     })}/>
                </td>
            </tr>
            <tr>
                <td> 
                    <span>mô tả sản phẩm</span>
                </td>
                <td>
                    <input type="text" id="product_dicription" required onChange={(e=>{
                        setproduct_dicription(e.target.value)
                     })}/>
                </td>
            </tr>
            <tr>
                <td> 
                     <span>giá sản phẩm</span>
                </td>
                <td>
                <input type="number" id="product_price" required onChange={(e=>{
                        setproduct_price(e.target.value)
                     })}/>
                </td>
            </tr>
            <tr>
                <td> 
                     <span>sô lượng đã bán sản phẩm</span>
                </td>
                <td>
                    <input type="number" id="product_sold" required  onChange={(e=>{
                        setproduct_sold(e.target.value)
                     })}/>
                </td>
            </tr>
            <tr>
                <td> 
                     <span>sô lượng </span>
                </td>
                <td>
                    <input type="number" id="product_quantity" required  onChange={(e=>{
                        setproduct_quantity(e.target.value)
                     })}/>
                </td>
            </tr>
           
            <tr>
                <td> 
                    <span>đánh giá </span>
                </td>

                <td>
                    <input type="number" id="product_rating" required onChange={(e=>{
                        setproduct_rating(e.target.value)
                     })}/>
                </td>
            </tr>
            <tr>
                <td>
                    <span>kiểu kết nối</span>
                    </td>
                    <td>
                    <input type="text" id="connection_type" required onChange={(e=>{
                        setconnection_type(e.target.value)
                     })}/>
                     
                </td>
            </tr>
            <tr>
                <td>
                    <span>bảo hành( trong bao lâu ) </span>
                    </td>
                    <td>
                    <input type="text" id="guarantee" required onChange={(e=>{
                        setguarantee(e.target.value)
                     })}/>
                     
                </td>
            </tr>
            <tr>
                <td>
                    <span>gửi tử</span>
                    </td>
                    <td>
                    <input type="text" id="sent_from" required onChange={(e=>{
                        setsent_from(e.target.value)
                     })}/>
                </td>
            </tr>

            <tr>
                <td>
                    <span>thương hiệu sản phầm</span>
 
                    </td>
                    <td>
                    <input type="text" id="brand" required onChange={(e=>{
                        setbrand(e.target.value)
                     })}/>
                </td>
            </tr>

            <tr>
                <td>
                    <span>ảnh sản phầm (nhiều nhất là 5 ảnh) </span>

                    </td>
                    <td>
                    <input type="file" id="avata"  multiple required max='5' onChange={(e=>{
                        setavata(e.target.files)
                     })}/>

                </td>
            </tr> 
            <tr>
                    <td>
                    </td>
                    <td>
                    <input type="submit" id="submit"  />

                </td>
            </tr>
        </table>
      
    </form>)
}

export default FormElectroinc