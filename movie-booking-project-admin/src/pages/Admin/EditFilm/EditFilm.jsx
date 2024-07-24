import { Button, DatePicker, Modal, Select, Switch, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { LockOutlined } from "@ant-design/icons";
// import { getUserServ } from "../../../Services/userServices";
import { useDispatch, useSelector } from "react-redux";
// import { movieService } from "../../Services/movieService";
import moment from "moment";
import { movieActions } from "../../../store/actions/movieAction";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const { TextArea } = Input;

const { Option } = Select;

const layout = {
    labelCol: {
        span: 8,
        offset: 0,
    },
    wrapperCol: {
        span: 16,
    },
    labelAlign: "left",
};
const validateMessages = {
    required: "Bắt buộc",
};

const EditFilm = ({
    isOpenModalEdit,
    setIsOpenModalEdit,
    setUpdate,
    phim
}) => {

    const movieInfo = useSelector(state => state.movieReducer.movieInfo);
    const userLogin = useSelector(state => state.userReducer.userLogin);
    console.log(userLogin)
    console.log(movieInfo)
    // console.log('movieInfo',movieInfo);
    const dispatch = useDispatch();
    const [imgSrc, setImgSrc] = useState('');
    const [itemFilm, setItemFilm] = useState({});
    useEffect(() => {
        setItemFilm(phim)
    }, [])
    console.log(phim)
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maphim: phim.maPhim,
            moTa: phim.moTa,
            tenPhim: phim.tenPhim,
            sapChieu: phim.sapChieu,
            dangChieu: phim.dangChieu,
            hot: phim.hot,
            ngayKhoiChieu: phim.ngayKhoiChieu,
            danhGia: phim.danhGia,
            maNhom: phim.maNhom,
            trailer: phim.trailer,
            hinhAnh: phim.hinhAnh,
            maNhom: 'GP01',
        },
        onSubmit: async (values) => {

            console.log(values.tenPhim)
            //tạo đối tượng formData, đưa giá trị values từ formik vào formData
            // console.log('values ', values)
            // console.log('formData', formData.get('File'))
            let formData = new FormData();
            for (let key in values) {

                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                }
                else {
                    if (values[key].size > 0) {
                        formData.append('File', values.hinhAnh, values.hinhAnh.name);
                    } else {
                        formData.append(key, null);
                    }

                }
            }
            // console.log('formData', formData.get('File'))
            //Gọi api gửi các giá trị từ formData về backend xử lý
            dispatch(movieActions.updateMovieInfo(formData))
            try {

                dispatch(movieActions.getMovieList());
                const result = await axios({
                    url: (`https://movienew.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload`),
                    method: 'POST',
                    headers: {
                        "TokenCyberSoft": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIyMC8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzkyNzA0MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3OTQxODAwMH0.S7l5kogAVJjRW8mjJ5gosJraYq5ahYjrBwnMJAaGxlY',

                        "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidXNlclRlc3QwMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InVzZXJUZXN0MDFAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIlF1YW5UcmkiLCJ1c2VyVGVzdDAxQGdtYWlsLmNvbSIsIkdQMDEiXSwibmJmIjoxNjY3MjQ0NDc1LCJleHAiOjE2NjcyNDgwNzV9.fkMN7S09HVQPjfNPITN3pTUWus8N21juyAzzTU-93vI',

                        "Content-Type": "multipart/form-data"
                    },

                    data: formData,
                })

                setIsOpenModalEdit(false)
                setUpdate(Math.random());
                navigate("/film");
                message.success('Chỉnh sửa thành công')

            } catch (error) {
                message.error(`Chỉnh sửa không thành công vì ${error.response.data.content}`);
                setIsOpenModalEdit(true);
            }
            //gọi lại để render lại list film
        }
    })
    const handleChangeFile = async (e) => {
        //lấy file ra từ e
        let file = e.target.files[0]
        if (file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png') {
            //đem dữ liệu lưu vào formik, await đảm bảo upload dữ liệu xong thì mới chạy dòng code bên dưới
            await formik.setFieldValue('hinhAnh', file);
            //tạo đối tượng để đọc file
            let reader = new FileReader();
            //trả ra url
            reader.readAsDataURL(file);
            //onload bắt lấy url
            reader.onload = (e) => {
                console.log(e.target.result)
                //hình type base64
                setImgSrc(e.target.result)
            }
            // console.log('files', file)
        }
    }

    //closure function cho các switch button
    const handleChangeSwitch = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }

    const handleChangeInputNumber = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }
    const handleChangeDatePicker = (value) => {
        console.log(value)
        // let ngayKhoiChieu = moment(value);
        formik.setFieldValue('ngayKhoiChieu', value)
    }

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }

        return e?.fileList;
    };
    let startDate = moment(
        moment(phim.ngayKhoiChieu).format("DD/MM/YYYY"),
        "DD/MM/YYYY"
    );

    const navigate = useNavigate();
    return (
        <>
            <Modal
                title="Cập nhật phim"
                footer={null}
                centered
                open={isOpenModalEdit}
                onCancel={() => {
                    setIsOpenModalEdit(false);
                }}
                width={1000}
            >
                <div>
                    <Form
                        onSubmitCapture={formik.handleSubmit}
                        {...layout}
                        name="nest-messages"
                        initialValues={{
                            tenPhim: phim.tenPhim,
                            moTa: phim.moTa,
                            sapChieu: phim.sapChieu,
                            dangChieu: phim.dangChieu,
                            hot: phim.hot,
                            ngayKhoiChieu: moment(phim.ngayKhoiChieu, 'DD-MM-YYYY'),
                            danhGia: phim.danhGia,
                            maNhom: phim.maNhom,
                            trailer: phim.trailer,
                            hinhAnh: phim.hinhAnh,
                        }}
                        onFinish={(values) => {
                            console.log(values)
                            let ngayKhoiChieu = moment(values.ngayKhoiChieu._d).format(
                                "DD/MM/YYYY"
                            );

                            // // param đầu tiên trong Blob là 1 array chứa dạng dữ liệu
                            // let blob = new Blob([values.hinhAnh[0].originFileObj], {
                            //     type: "image/jpg",
                            // });

                            // let formData = new FormData();

                            // formData.append("tenPhim", values.tenPhim);
                            // formData.append("moTa", values.moTa);
                            // formData.append("ngayKhoiChieu", ngayKhoiChieu);
                            // formData.append("sapChieu", values.sapChieu);
                            // formData.append("dangChieu", values.dangChieu);
                            // formData.append("hot", values.hot);
                            // formData.append("danhGia", values.danhGia);
                            // formData.append("maNhom", "GP01");
                            // formData.append("trailer", values.trailer);
                            // formData.append(
                            //     "hinhAnh",
                            //     blob,
                            //     values.hinhAnh[0].originFileObj.name
                            // );

                        }}
                        validateMessages={validateMessages}
                        className="w-5/6 mt-2 max-h-max xl:h-128 flex flex-col justify-center mx-auto"
                    >
                        <Form.Item
                            name="tenPhim"
                            label="Tên phim"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input name='tenPhim' onChange={formik.handleChange} />
                        </Form.Item>
                        <Form.Item
                            name="trailer"
                            label="Trailer phim"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input name='trailer' onChange={formik.handleChange} />
                        </Form.Item>
                        <Form.Item
                            name={["moTa"]}
                            label="Mô tả"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <TextArea rows={4} name='moTa' onChange={formik.handleChange} />
                        </Form.Item>
                        <Form.Item
                            name={["ngayKhoiChieu"]}
                            label="Ngày khởi chiếu"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <DatePicker
                                placeholder="Chọn ngày khởi chiếu"
                                className="w-72"
                                format={"DD/MM/YYYY"}
                                name='ngayKhoiChieu'
                                onChange={handleChangeDatePicker}

                            />
                        </Form.Item>
                        <Form.Item
                            label="Sắp chiếu"
                            valuePropName="checked"
                            name="sapChieu"
                        >
                            <Switch name='sapChieu' onChange={handleChangeSwitch('sapChieu')} />
                        </Form.Item>
                        <Form.Item
                            label="Đang chiếu"
                            valuePropName="checked"
                            name="dangChieu"
                        >
                            <Switch name='dangChieu' onChange={handleChangeSwitch('dangChieu')} />
                        </Form.Item>
                        <Form.Item label="18+" valuePropName="checked" name="hot">
                            <Switch name='hot' onChange={handleChangeSwitch('hot')} />
                        </Form.Item>
                        <Form.Item
                            name={["danhGia"]}
                            label="Đánh giá"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <InputNumber onChange={handleChangeInputNumber('danhGia')} min={1} max={10} />
                        </Form.Item>
                        <Form.Item
                            name="hinhAnh"
                            label="Chọn ảnh bìa"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                        // rules={[
                        //   {
                        //     required: true,
                        //   },
                        // ]}
                        >
                            <input type='file' onChange={handleChangeFile}></input>
                            <br />
                            <img onChange={handleChangeFile} src={imgSrc === '' ? phim.hinhAnh : imgSrc} alt="..." style={{ width: 150, height: 150 }} accept="image/png, image/jpeg, image/jpg"
                            />
                        </Form.Item>
                        <div className="text-center mb-8">
                            <button type='submit' className="py-1 px-4 bg-blue-700 md:text-base rounded-md text-white">
                                Cập nhật
                            </button>
                        </div>
                    </Form>
                </div>
            </Modal>
        </>
    );
};

export default EditFilm;
