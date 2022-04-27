import { Layout, Menu } from 'antd'
import Link from 'next/link'
const { Header } = Layout

export default function HeaderMenu() {
    return (
        <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[1]}>
                <Menu.Item key={1}><Link href="/">Karyawan</Link></Menu.Item>
                <Menu.Item key={2}><Link href="/karyawan_pertama">Karyawan Pertama</Link></Menu.Item>
                <Menu.Item key={3}>
                    <Link href="/ambil_cuti">
                        Karyawan Ambil Cuti
                    </Link>
                </Menu.Item>
                <Menu.Item key={4}>
                    <Link href="/cuti_dua">
                        Karyawan Ambil Cuti Lebih Dari 1
                    </Link>
                </Menu.Item>
                <Menu.Item key={5}>
                    <Link href="/sisa_cuti">
                        Sisa Cuti
                    </Link>
                </Menu.Item>

            </Menu>
        </Header>
    );
}