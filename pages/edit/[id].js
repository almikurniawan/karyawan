import { Layout, Menu, Card, Input, Button, DatePicker, Form, Space } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import HeaderMenu from '../../components/header_menu'
import moment from 'moment'
import { useState } from 'react'
const { Header, Content } = Layout

function Edit({ data }) {
    const [form] = Form.useForm()

    const [tgl_lahir, setTglLahir] = useState(data.data.tgl_lahir)
    const [tgl_gabung, setTglGabung] = useState(data.data.tgl_gabung)
    const [nama, setNama] = useState(data.data.nama)
    const [alamat, setAlamat] = useState(data.data.alamat)

    const router = useRouter()
    const { id } = router.query

    const simpan = async ()=>{
        const res = await fetch('http://localhost/apps/karyawan/public/karyawan/update/'+id, {
            method: 'POST',
            body: JSON.stringify({
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
                    <Card title="Edit Karyawan" style={{ width: '100%', marginBottom: '50px' }}>
                        <Form
                            form={form}
                            layout="vertical"
                        >
                            <Form.Item label="Nama" tooltip="This is a required field">
                                <Input placeholder="Masukan Nama" value={nama} onChange={(value)=>{
                                    console.log(value.target.value)
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

export async function getServerSideProps(context) {
    const { id } = context.query
    const res = await fetch('http://localhost/apps/karyawan/public/karyawan/detail/'+id)
    const data = await res.json()
    return { props: { data } }
}

export default Edit