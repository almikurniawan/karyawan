import { Layout, Table, Button, Tooltip, Space, Row, Col, Modal } from 'antd'
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import HeaderMenu from '../components/header_menu'
const { Content } = Layout

function Home({ data }) {
  const dataSource = data.data
  
  const router = useRouter()

  const columns = [
    {
      title: 'No. Induk',
      dataIndex: 'no_induk',
      key: 'no_induk',
    },
    {
      title: 'Nama',
      dataIndex: 'nama',
      key: 'nama',
    },
    {
      title: 'Alamat',
      dataIndex: 'alamat',
      key: 'alamat',
    },
    {
      title: 'Tgl. Lahir',
      dataIndex: 'tgl_lahir',
      key: 'tgl_lahir',
      render: (text, row, index) => {
        return new Date(text).toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      }
    },
    {
      title: 'Tgl. Bergabung',
      dataIndex: 'tgl_gabung',
      key: 'tgl_gabung',
      render: (text, row, index) => {
        return new Date(text).toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      }
    },
    {
      title: 'Aksi',
      dataIndex: 'act',
      key: 'act',
      render: (text, row, index) => {
        const id = row.no_induk
        const key = Math.random()
        return (
          <Space key={{ key }}>
            <Tooltip title="edit">
              <Link href={"/edit/" + id}>
                <Button type="primary" shape="circle" icon={<EditOutlined />} />
              </Link>
            </Tooltip>
            <Tooltip title="delete">
              <Button type="danger" onClick={()=>{
                showConfirm(id)
              }} shape="circle" icon={<DeleteOutlined />} />
            </Tooltip>
          </Space>
        )
      }
    },
  ]

  const showConfirm = async (id)=>{
    Modal.confirm({
      title: 'Ingin menghapus data ini?',
      icon: <ExclamationCircleOutlined />,
      content: 'Data karyawan yang telah terhapus tidak bisa dikembalikan kembali',
      async onOk(){
        const res = await fetch('http://localhost/apps/karyawan/public/karyawan/delete/'+id)
        let result = await res.json()
        if(result.status){
          refreshData()
        }
      },
      onCancel() {
      },
    });
  }

  const refreshData = () => {
    router.replace(router.asPath)
  }
  
  return (
    <Layout className="layout">
      <HeaderMenu/>
      <Content style={{ padding: '0 50px', marginTop: '50px' }}>
        <div className="site-layout-content">
            <Row style={{marginBottom: '15px'}}>
              <Col span={24}>
                <Link href="/add">
                  <Button type="primary">Tambah Karyawan</Button>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col span={24}><Table dataSource={dataSource} columns={columns} /></Col>
            </Row>
        </div>
      </Content>
    </Layout>
  )
}


export async function getServerSideProps(context) {
  const res = await fetch('http://localhost/apps/karyawan/public/karyawan/data')
  const data = await res.json()
  return { props: { data } }
}

export default Home