import React from "react";
import styles from "../styles/PasteList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from 'next/router';

const PasteList = ({ pastes }) => {
  const router = useRouter();

  if(pastes.length == 0){
    return (
      <div className="flex flex-col h-screen justify-start items-center py-20 px-10">
        <div className="space-y-5">
          <div className="text-4xl font-bold ">No Pastes Found 🤦‍♂️</div>
          <p className="text-lg">
            ✅ Please check if your wallet is connected.
          </p>
          <p className="text-lg">
            ✅ Make sure you have a paste or create one from{" "}
            <span className="text-blue-800 hover:text-blue-500 hover:underline">
              <Link href="/">here</Link>
            </span>
          </p>

        </div>
      </div>
    );
  }
  return (
    <div className="flex h-screen justify-center items-start py-20 px-10">
      <div className="flex justify-center items-center w-full max-w-xl">
        <table className="min-w-full ">
          <thead>
            <tr>
              <th className="py-4 px-6 pr-28 text-left text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Filename
              </th>
              <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Author
              </th>
              <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {pastes.map((item) => (
              <tr onClick={()=>{
                router.push(`/recent/${item.id}`);
              }} key={item.id} className="hover:bg-gray-300">
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faFileLines} />
                    <div className={styles.fileName}>{item.title}</div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-[#999]">{item.author}</div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-[#999]">{item.date}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PasteList;
