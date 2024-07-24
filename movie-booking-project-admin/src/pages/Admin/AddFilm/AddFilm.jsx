import { Button, DatePicker, Modal, Select, Switch, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, message } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
import { LockOutlined } from "@ant-design/icons";
// import { getUserServ } from "../../../Services/userServices";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from 'formik'
// import { movieService } from "../../Services/movieService";
import moment from "moment";
import axios from "axios"
import { movieActions } from "../../../store/actions/movieAction";
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

const AddFilm = ({ isOpenModal, setIsOpenModal, fetchFilmList, error }) => {
    const dispatch = useDispatch();
    const [imgSrc, setImgSrc] = useState('');
    // const {error} = useSelector((state)=>state.movieReducer)
    console.log('error add film', error)
    const formik = useFormik({
        initialValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 1,
            hinhAnh: {},
        },
        onSubmit: async (values) => {
            // values.maNhom = 'GP10'
            //tạo đối tượng formData, đưa giá trị values từ formik vào formData
            let formData = new FormData();
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                }
                else {
                    formData.append('File', values.hinhAnh, values.hinhAnh.name);
                }
            }

            console.log('hinhAnh', values.hinhAnh)
            console.log('formData', formData.get('File'))
            //Gọi api gửi các giá trị từ formData về backend xử lý
            try {
                dispatch(movieActions.addMovieList(formData))
                const response = await axios({
                    url: (`https://movienew.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh`),
                    method: 'POST',
                    headers: {
                        "TokenCyberSoft": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIyMC8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzkyNzA0MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3OTQxODAwMH0.S7l5kogAVJjRW8mjJ5gosJraYq5ahYjrBwnMJAaGxlY',
                        "Content-Type": "multipart/form-data"

                    },
                    data: formData,
                })
                console.log(response.data.statusCode)
                message.success("Thêm thành công");
                setIsOpenModal(false)
            } catch (error) {
                console.log('eror add', error.response.data.content)
                message.error(`Thêm phim không thành công vì ${error.response.data.content}`);
                setIsOpenModal(true);
            }

        }
    })
    //function truyen gia tri ngay khoi chieu vào formik
    const handleChangeDatePicker = (value) => {
        // console.log('datepicker',moment(value).format('DD/MM/YYYY'))
        let ngayKhoiChieu = moment(value).format('DD/MM/YYYY')
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
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

    const handleChangeFile = (e) => {
        //lấy file ra từ e
        let file = e.target.files[0]
        if (file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png') {
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
            //đem dữ liệu lưu vào formik
            formik.setFieldValue('hinhAnh', file);
            console.log('files', file)
        }
    }

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }

        return e?.fileList;
    };
    return (
        <>
            <Modal
                title="Thêm phim mới"
                footer={null}
                centered
                open={isOpenModal}
                onCancel={() => {
                    setIsOpenModal(false);
                }}
                width={1000}
            >
                <div>
                    <Form
                        onSubmitCapture={formik.handleSubmit}
                        {...layout}
                        initialValues={{ danhGia: 5 }}
                        name="nest-messages"
                        onFinish={(values) => {
                            console.log(values.sapChieu);
                            let startDate = moment(values.ngayKhoiChieu._d).format(
                                "DD/MM/YYYY"
                            );

                            // param đầu tiên trong Blob là 1 array chứa dạng dữ liệu
                            let blob = new Blob([values.hinhAnh[0].originFileObj], {
                                type: "image/jpg",
                            });

                            let formData = new FormData();

                            formData.append("tenPhim", values.tenPhim);
                            formData.append("moTa", values.moTa);
                            formData.append("ngayKhoiChieu", startDate);
                            formData.append("sapChieu", values.sapChieu);
                            formData.append("dangChieu", values.dangChieu);
                            formData.append("hot", values.hot);
                            formData.append("danhGia", values.danhGia);
                            formData.append("maNhom", "GP01");
                            formData.append("trailer", values.trailer);
                            formData.append(
                                "hinhAnh",
                                blob,
                                values.hinhAnh[0].originFileObj.name
                            );

                            //   movieService
                            //     .postNewMovie(formData)
                            //     .then((res) => {
                            //       message.success(res.data.content);
                            //       setIsOpenModal(false);
                            //       fetchFilmList();
                            //     })
                            //     .catch((err) => {
                            //       message.error(err.response.data.content);
                            //     });
                        }}
                        validateMessages={validateMessages}
                        className="w-5/6 mt-2 max-h-max xl:h-128 flex flex-col justify-center mx-auto"
                    >
                        <Form.Item
                            name={["tenPhim"]}
                            label="Tên phim"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input required name='tenPhim' onChange={formik.handleChange} />
                        </Form.Item>
                        <Form.Item
                            name={["trailer"]}
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
                            {/* onChange không lấy được thuộc tính name của inputnumber */}
                            <InputNumber onChange={handleChangeInputNumber('danhGia')} min={1} max={10} />
                        </Form.Item>
                        <Form.Item
                            name="hinhAnh"
                            label="Chọn ảnh bìa"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <input type='file' onChange={handleChangeFile}></input>
                            <br />
                            <img src={imgSrc} alt="..." style={{ width: 150, height: 150 }} accept="image/png, image/jpeg, image/jpg" />
                            {/* <Upload name="logo" listType="picture">
                                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                            </Upload> */}
                        </Form.Item>

                        <div className="text-center mb-8">
                            <button type="submit" className="py-1 px-4 bg-blue-700 md:text-base rounded-md text-white">
                                Thêm mới
                            </button>
                        </div>
                    </Form>
                </div>
            </Modal>
        </>
    );
};

export default AddFilm;

