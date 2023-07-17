import InputField from "@/components/inputField"

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

export default function page() {
    return (
        <div>
            <div className="row-auto">
                <InputField placeholder="Search by contract name" />
            </div>
            <div className="row-auto">
                <table>
                    <thead>
                        <tr>
                            <th>CONTRACTS</th>
                            <th>TYPE</th>
                            <th>EXPIRATION DATE</th>
                            <th>WEIGHT</th>
                            <th>COW</th>
                            <th>STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>My contract 01</td>
                            <td>FAT OX</td>
                            <td>05-31-2024</td>
                            <td>2.8 Kg</td>
                            <td>0.58 (0.0 USD)</td>
                            <td>Active</td>
                            <td>View</td>
                        </tr>
                        <tr>
                            <td>My contract 01</td>
                            <td>FAT OX</td>
                            <td>05-31-2024</td>
                            <td>2.8 Kg</td>
                            <td>0.58 (0.0 USD)</td>
                            <td>Active</td>
                            <td>View</td>
                        </tr>
                        <tr>
                            <td>My contract 01</td>
                            <td>FAT OX</td>
                            <td>05-31-2024</td>
                            <td>2.8 Kg</td>
                            <td>0.58 (0.0 USD)</td>
                            <td>Active</td>
                            <td>View</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="row-auto">
                <span>1</span>
                <span>2</span>
                <span>3</span>
            </div>
        </div>
    )
}
