import { Layout, Card, Input, Button, DatePicker, Form, Space } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import HeaderMenu from '../components/header_menu'
import moment from 'moment'
import { useState } from 'react'
const { Content } = Layout

const Add = () => {
    const [form] = Form.useForm()

    const [tgl_lahir, setTglLahir] = useState(moment().format("YYYY-MM-DD"))
    const [tgl_gabung, setTglGabung] = useState(moment().format("YYYY-MM-DD"))
    const [nama, setNama] = useState('')
    const [alamat, setAlamat] = useState('')
    const [no_induk, setNoInduk] = useState('')

    const router = useRouter()

    const simpan = async ()=>{
        const res = await fetch('http://localhost/apps/karyawan/public/karyawan/create', {
            method: 'POST',
            body: JSON.stringify({
                'no_induk' : no_induk,
                'nama' : nama,
                'alamat' : alamat,
                'tgl_lahir' : tgl_lahir,
                'tgl_gabung' : tgl_gabung
            })
        })
        let result = await res.json()

        if(result.status=='success'){
            router.push('/')
        }
    }

    return (
        <Layout className="layout">
            <HeaderMenu/>
            <Content style={{ padding: '0 50px', marginTop: '50px' }}>
                <div className="site-layout-content">
                    <Card title="Tambah Karyawan" style={{ width: '100%', marginBottom: '50px' }}>
                        <Form
                            form={form}
                            layout="vertical"
                        >
                            <Form.Item label="No. Induk" tooltip="This is a required field">
                                <Input placeholder="Masukan No Induk" value={no_induk} onChange={(value)=>{
                                    setNoInduk(value.target.value)
                                }} />
                            </Form.Item>
                            <Form.Item label="Nama" tooltip="This is a required field">
                                <Input placeholder="Masukan Nama" value={nama} onChange={(value)=>{
                                    setNama(value.target.value)
                                }} />
                            </Form.Item>
                            <Form.Item
                                label="Alamat"
                                tooltip='This is a required field'
                            >
                                <Input placeholder="Masukan Alamat" value={alamat} onChange={(value)=>{
                                    setAlamat(value.target.value)
                                }} />
                            </Form.Item>
                            <Form.Item
                                label="Tanggal Lahir"
                                tooltip='This is a required field'
                            >
                                <DatePicker value={moment(tgl_lahir, 'YYYY-MM-DD')} onChange={(value)=>{
                                    setTglLahir(value.format("YYYY-MM-DD"))
                                }} />
                            </Form.Item>
                            <Form.Item
                                label="Tanggal Gabung"
                                tooltip='This is a required field'
                            >
                                <DatePicker value={moment(tgl_gabung, 'YYYY-MM-DD')} onChange={(value)=>{
                                    setTglGabung(value.format("YYYY-MM-DD"))
                                }}/>
                            </Form.Item>
                            <Form.Item>
                                <Space>
                                    <Button type="primary" onClick={()=>{
                                        simpan()
                                    }}>Simpan</Button>
                                    <Link href="/">
                                        <Button type="warning">Batal</Button>
                                    </Link>
                                </Space>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </Content>
        </Layout>
    )
}

export default Add