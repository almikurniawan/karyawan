import { Layout, Table, Row, Col } from 'antd'
import HeaderMenu from '../components/header_menu'
const { Content } = Layout

function Home({ data }) {
  const dataSource = data.data

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
      title: 'Tgl. Cuti',
      dataIndex: 'tgl_cuti',
      key: 'tgl_cuti',
    },
    {
      title: 'Keterangan',
      dataIndex: 'keterangan',
      key: 'keterangan',
    },
  ]

  return (
    <Layout className="layout">
      <HeaderMenu/>
      <Content style={{ padding: '0 50px', marginTop: '50px' }}>
        <div className="site-layout-content">
            <Row>
              <Col span={24}><Table dataSource={dataSource} columns={columns} /></Col>
            </Row>
        </div>
      </Content>
    </Layout>
  )
}


export async function getServerSideProps(context) {
  const res = await fetch('http://localhost/apps/karyawan/public/karyawan/ambilCuti')
  const data = await res.json()
  return { props: { data } }
}

export default Home