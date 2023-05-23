import {
    Box,
    Button,
    Card,
    CardContent,
    Collapse,
    FormGroup,
    Grid,
    Link,
    Typography
} from "@mui/material"

import { KeyboardArrowDown } from "@mui/icons-material"

import { FutureContract } from "types/DAO"

import ModalDeployContract from "components/ModalDeployContract"
import useContract from "hooks/useContract"

import DAOLogo from "assets/images/arroba.png"
import Logo from "assets/images/logo-black.png"

import ModalSellContract from "components/ModalSellContract"
import { useEffect, useState } from "react"
import ModalConfirm from "components/ModalConfirm"
import {
    removeContractSellOrder,
    updateContract
} from "services/firebase/contracts"
import { writePrivateEvent } from "services/firebase/events"
import ModalWithdraw from "components/ModalWithdraw"

import { useAccount } from "wagmi"

interface Card {
    contract: FutureContract
    active?: boolean
    currentBlock?: number
}

const ContractCard = (props: Card) => {
    const { contract } = props
    const { address: account } = useAccount()
    const [modalSell, setModalSell] = useState(false)
    const [modalCancelSell, setModalCancelSell] = useState(false)
    const [showClauses, setShowClauses] = useState(false)

    const { execFunction, loading } = useContract()

    const [withdrawDisabled, setWithdrawDisabled] = useState(false)

    const [modalWithdraw, setModalWithdraw] = useState(false)

    if (!account) return <></>
    if (!contract.address) return <></>
    if (contract?.investor.toLowerCase() !== account?.toString().toLowerCase())
        return <></>

    useEffect(() => {
        if (props.contract.blockLimit && props.currentBlock) {
            if (props.contract.blockLimit > props.currentBlock) {
                setWithdrawDisabled(true)
            }
        }
    }, [props.contract.blockLimit, props.currentBlock])

    const handleCancelSaleOrder = async () => {
        await execFunction(
            {
                instanceType: "future",
                functionName: "updateActive(bool)",
                contractAddress: contract.address,
                onFinish: () => {
                    removeContractSellOrder(contract.address)
                    setModalCancelSell(false)

                    writePrivateEvent(account?.toString(), Date.now(), {
                        type: "sale",
                        message: "Contract sale order canceled",
                        contractAddress: contract.address
                    })
                }
            },
            false
        )
    }

    const Paragraph = ({ children }: { children: any }) => (
        <Typography variant="body1" align="justify" sx={{ my: 2 }}>
            {children}
        </Typography>
    )

    return (
        <>
            <ModalDeployContract open={loading} hash="" />

            <ModalSellContract
                isOpen={modalSell}
                handleClose={() => setModalSell(false)}
                contract={contract}
            />
            <ModalConfirm
                isOpen={modalCancelSell}
                handleClose={() => setModalCancelSell(false)}
                title="Cancel sell order?"
                message="This action can not be undone"
                handleConfirm={handleCancelSaleOrder}
            />

            <ModalWithdraw
                isOpen={modalWithdraw}
                handleClose={() => setModalWithdraw(false)}
                handleConfirm={() => {
                    setModalWithdraw(false)

                    execFunction(
                        {
                            instanceType: "future",
                            functionName: "withdraw()",
                            contractAddress: contract.address,
                            onFinish: () => {
                                updateContract(contract.address, {
                                    ...contract,
                                    withdrawn: true
                                })

                                writePrivateEvent(account, Date.now(), {
                                    type: "withdraw",
                                    message:
                                        "Contract withdraw requested successfully",
                                    contractAddress: contract.address
                                })
                            }
                        },
                        {
                            gasLimit: 10000000
                        }
                    )
                }}
            />
            <Box
                sx={{
                    width: "100%",
                    mb: 2,
                    boxShadow: "none"
                }}
            >
                <Card
                    sx={{
                        boxShadow: "none",
                        border: "solid 1px rgba(0,0,0,.22)",
                        borderRadius: "10px"
                    }}
                >
                    <Box>
                        <Grid container>
                            <Grid
                                item
                                md={2}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                    ["@media only screen and (max-width: 768px)"]:
                                        {
                                            pt: 1
                                        }
                                }}
                            >
                                <img
                                    src={DAOLogo.src}
                                    style={{
                                        maxWidth: "60px"
                                    }}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <CardContent
                                    sx={{
                                        flex: 1,

                                        ["@media only screen and (min-width: 768px)"]:
                                            {
                                                px: 0
                                            }
                                    }}
                                >
                                    <Typography
                                        sx={{ fontSize: 14, mb: 0 }}
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        Commodities futures smart contracts
                                    </Typography>
                                    <Typography
                                        sx={{ fontSize: 16 }}
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        <Link
                                            href={`https://polygonscan.com/address/${contract.address}`}
                                            target="_blank"
                                        >
                                            {contract.address}
                                        </Link>
                                    </Typography>

                                    <Typography
                                        id="kg"
                                        variant="h5"
                                        component="div"
                                    >
                                        {contract.amount.toFixed(2)} Kg
                                    </Typography>

                                    <Typography color="text.secondary">
                                        Expiration Date: {contract.dateLimit}
                                    </Typography>
                                </CardContent>
                            </Grid>

                            <Grid item md={4}>
                                <CardContent
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "flex-end",
                                        height: "100%"
                                    }}
                                >
                                    <FormGroup>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            disabled={withdrawDisabled}
                                            sx={{
                                                textTransform: "capitalize",
                                                mt: 1
                                            }}
                                            size="small"
                                            onClick={() =>
                                                setModalWithdraw(true)
                                            }
                                        >
                                            Withdraw @
                                        </Button>
                                    </FormGroup>
                                </CardContent>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <div
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center"
                                }}
                            >
                                <Button
                                    onClick={() => setShowClauses(!showClauses)}
                                >
                                    Contractual clauses{" "}
                                    <KeyboardArrowDown
                                        style={{
                                            transform: showClauses
                                                ? "rotate(180deg)"
                                                : "rotate(0deg)",
                                            transition: "all 0.5s"
                                        }}
                                    />{" "}
                                </Button>
                            </div>
                        </Grid>

                        <Collapse in={showClauses} timeout={1000}>
                            <Grid container>
                                <Grid item>
                                    {contract.address ? (
                                        <CardContent>
                                            <Grid
                                                item
                                                sx={{
                                                    display: "flex",
                                                    my: 3,
                                                    alignItems: "center"
                                                }}
                                            >
                                                <img
                                                    src={DAOLogo.src}
                                                    style={{
                                                        maxWidth: "32px",
                                                        maxHeight: "32px"
                                                    }}
                                                />
                                                <Typography
                                                    align="center"
                                                    color="black"
                                                    fontWeight="bold"
                                                >
                                                    MEMBERS AGREEMENT IN THE
                                                    FORM OF PRODUCTION
                                                    COOPERATION BY EXTRACTODAO
                                                    SMART CONTRACTS
                                                </Typography>

                                                <img
                                                    src={Logo.src}
                                                    style={{
                                                        maxWidth: "60px",
                                                        maxHeight: "60px",
                                                        objectFit: "contain"
                                                    }}
                                                />
                                            </Grid>

                                            <Paragraph>
                                                ExtractoDAO is a privately owned
                                                Decentralized Autonomous
                                                Organization, sometimes called
                                                Decentralized Autonomous
                                                Corporation, owner of shared
                                                purpose blockchain and manager
                                                of a collective smart contract
                                                by DAO on Drawer technology that
                                                stores several individual smart
                                                contracts under the
                                                responsibility of each
                                                participant that is the contract
                                                auditor and issuer of the
                                                stablecon COW; And for the
                                                purposes of this document
                                                represented by the owner Joel
                                                Almeida creator, holder, issuer
                                                and holder In compliance with
                                                all laws of this country.
                                                ExtractoDAO It is virtually
                                                located in the Domain{" "}
                                                <Link
                                                    href="https://www.extractodao.com"
                                                    target="_blank"
                                                >
                                                    www.extractodao.com
                                                </Link>
                                                . ExtractoDAO is the rightful
                                                issuer of the ExtractoDAO Bull
                                                XBLL governance token contract{" "}
                                                <Link
                                                    href="https://polygonscan.com/address/0x8110706a399D457D67b7A2B7636482b4bfCeBB21"
                                                    target="_blank"
                                                >
                                                    0x8110706a399D457D67b7A2B7636482b4bfCeBB21
                                                </Link>
                                                , issuer and keeper of the BULL
                                                tokens (XBLL) In conformity with
                                                all the laws of this.
                                            </Paragraph>

                                            <Paragraph>
                                                On the other hand, the holder of
                                                this smart contract is the legal
                                                administrator of the private
                                                keys and is fully responsible
                                                for managing the funds and
                                                generating the COW that will be
                                                private and sent back to the
                                                original wallet.
                                            </Paragraph>

                                            <Paragraph>
                                                Smart contract address:{" "}
                                                <Link
                                                    href={`https://polygonscan.com/address/${contract.address}`}
                                                    target="_blank"
                                                >
                                                    {contract.address}
                                                </Link>
                                            </Paragraph>

                                            <Typography
                                                align="center"
                                                color="black"
                                                fontWeight="bold"
                                            >
                                                TERMS AND CONDITIONS
                                            </Typography>

                                            <Paragraph>
                                                ExtractoDAO market participants
                                                trade the futures market using
                                                Drawer technology on the
                                                blackchain to make a profit or
                                                hedge against losses. Each
                                                market calculates price and size
                                                movement differently and as such
                                                traders need to be aware of how
                                                the market you are trading
                                                calculates profit and loss. To
                                                calculate the profit and loss of
                                                each contract, you must
                                                calculate the value of the
                                                purchase weight and the added
                                                weight in the Beef Protein
                                                Extract@ contract, you will need
                                                to pay attention to the contract
                                                size or weight in KG, order size
                                                in dollars, price current
                                                trading position and what you
                                                bought or sold the contract for.
                                                Future fat cattle, for example,
                                                represent the expected value of
                                                100KG of animal protein. The
                                                price of an Extracto@ futures
                                                contract is quoted in dollars.
                                                Before version 2 of the
                                                platform, contracts with values
                                                below U$$ 100 were allowed The
                                                parties identified above have,
                                                amongst themselves, confirmed
                                                this live-cattle-kilos Purchase
                                                and Sale Agreement, which will
                                                be governed by the following
                                                clauses and by the price
                                                conditions and the rules of the
                                                whitepaper. The buyer asserts to
                                                have read all the documents, in
                                                its entire original form and
                                                payment terms described therein.
                                            </Paragraph>

                                            <Typography
                                                align="center"
                                                color="black"
                                                fontWeight="bold"
                                            >
                                                OBJECT OF THE AGREEMENT
                                            </Typography>

                                            <Paragraph>
                                                The OBJECT of this contract is
                                                (Quantity) KG of lean Nelore
                                                cattle, owned by the SELLER DAO,
                                                duly vaccinated and
                                                disease-free, as attested per a
                                                document signed by a
                                                veterinarian, attached to this
                                                instrument.
                                            </Paragraph>

                                            <Typography
                                                align="center"
                                                color="black"
                                                fontWeight="bold"
                                            >
                                                WITHDRAWAL
                                            </Typography>

                                            <Paragraph>
                                                Upon expiration, a Stablecoin
                                                COW will be generated. At first
                                                no physical withdrawal will be
                                                allowed, and when allowed, it
                                                will be under the responsibility
                                                of the buyer, who will have to
                                                pay delivery costs and other
                                                fees.
                                            </Paragraph>

                                            <Typography
                                                align="center"
                                                color="black"
                                                fontWeight="bold"
                                            >
                                                TERMS OF SALE
                                            </Typography>

                                            <Paragraph>
                                                For the purchase of the
                                                Extracto@ contract, object of
                                                this contract, the BUYER must
                                                pay the SELLER DAO an amount of
                                                USD fiat cash or in USDT, USDC,
                                                DAI, BUSD or backed COW after it
                                                is generated. All information on
                                                this website or other official
                                                channels is published for
                                                informational purposes only and
                                                is intended only for production
                                                participants in the agribusiness
                                                market for both institutional
                                                organizations and individuals
                                                with sophisticated DeFi
                                                knowledge. Any services provided
                                                in the future will be subject to
                                                the terms of the legal
                                                agreements relating thereto.
                                                Nothing on this Site should be
                                                construed as investment, tax,
                                                legal or other advice by
                                                ExtractoDAO or anyone else.
                                                ExtractoDAO and related services
                                                are not provided to any USA, UK,
                                                China and Brazil individuals as
                                                a financial investment with the
                                                promise of lucrative returns.
                                                ExtractoDAO is a global
                                                organization specializing in the
                                                management of real agricultural
                                                farms in the cooperative food
                                                production system. We provide
                                                services and futures contracts
                                                as ¨using the legal term and not
                                                as a form of futures market
                                                investment¨on the stock exchange
                                                but because food production is
                                                always done in the future, we
                                                are not with the ideas of
                                                tokenizing the futures market
                                                cryptocurrencies . We reserve
                                                the right to disagree with the
                                                DeFi model that creates
                                                unballast token.
                                            </Paragraph>

                                            <Paragraph>
                                                Smart contract Extracto@
                                                purchase is subject to these
                                                Terms and Conditions of Sale. By
                                                purchasing smart contract, the
                                                buyer confirms that he has read,
                                                understood and agreed to these
                                                Terms. These Terms are not
                                                intended to be and do not
                                                constitute a prospectus of any
                                                kind, are not an illegal
                                                investment offer under Brazilian
                                                law and do not refer in any way
                                                to an offer of securities in
                                                Brazil or any other
                                                jurisdiction. The buyer
                                                acknowledges and agrees that his
                                                decision to purchase, hold
                                                and/or use smart contracts is
                                                based primarily on the benefits
                                                and results from the production
                                                cooperative handled by DAO to be
                                                obtained from the use of the
                                                services and applications
                                                (“Services”) available on the
                                                ExtractoDAO Platform and access
                                                to specific programs of
                                                validation network incentive
                                                votes and project direction, not
                                                on any fluctuation in the
                                                monetary value of the Tokens is
                                                smart contracts.
                                            </Paragraph>

                                            <Paragraph>
                                                The buyer acknowledges and
                                                agrees that the purchase or
                                                possession of smart contrats
                                                Extracto@ does not represent or
                                                constitute, but only a
                                                collective production including
                                                the right to withdraw the
                                                products before the expiration
                                                of the smart contract
                                            </Paragraph>

                                            <Paragraph>
                                                a) any right of ownership or
                                                interest, stock, equity,
                                                security, commodity, bond, debt
                                                instrument or any other
                                                financial instrument or
                                                investment with equivalent
                                                rights;
                                            </Paragraph>

                                            <Paragraph>
                                                b) The Smart contract does not
                                                grant any right to receive
                                                future income but the receipt of
                                                weight produced by the owner of
                                                the contract who must burn it
                                                and generate a COWs or simply
                                                withdraw its product, the
                                                participant receives voting or
                                                governance rights from the DAO
                                                when purchasing the XBLL token.
                                            </Paragraph>

                                            <Paragraph>
                                                c) XBLL no any no is money or
                                                currency legal tender in any
                                                jurisdiction, nor do they
                                                constitute any representation of
                                                money (including electronic
                                                money).
                                            </Paragraph>

                                            <Paragraph>
                                                The buyer understands that the
                                                company plans to develop a
                                                digital platform for
                                                decentralized authenticity of
                                                identities, signatures and
                                                documents, using blockchain
                                                protocols, which:
                                            </Paragraph>

                                            <Paragraph>
                                                (i) enables the creation of a
                                                DRAWER based on blockchain,
                                                which can be used to sign future
                                                market contracts and documents,
                                                among other functions yet to be
                                                developed;
                                            </Paragraph>

                                            <Paragraph>
                                                (ii) allows DRAWER to be used as
                                                a financial reward system in
                                                agricultural production for data
                                                validators on the decentralized
                                                network, as well as for users
                                                who voluntarily provide services
                                                to the platform.
                                            </Paragraph>

                                            <Paragraph>
                                                Additional information about the
                                                Company and its platform can be
                                                found in the Whitepaper
                                                available at{" "}
                                                <Link
                                                    href="https://extractodao.com/whitepaper/whitepaper-en-08-12-22.pdf"
                                                    target="_blank"
                                                >
                                                    https://extractodao.com/whitepaper/whitepaper-en-08-12-22.pdf
                                                </Link>{" "}
                                                All descriptions in the
                                                Whitepaper are based on the
                                                original ideas about the
                                                business and the Company's
                                                environment as held by the
                                                Company on the date this
                                                Whitepaper was last updated, as
                                                well as the Company's views and
                                                intentions as of such date.
                                            </Paragraph>

                                            <Paragraph>
                                                The participant acknowledges
                                                that ExtractoDAO is the legal
                                                owner of the Drawer technology
                                                and the only holder with
                                                permission to use this
                                                technology.
                                            </Paragraph>
                                            <Paragraph>
                                                Participation does not allow
                                                copying, plagiarizing or
                                                transferring to third parties
                                                the ideas and patented codes of
                                                ExtractoDAO under the penalties
                                                of the law.
                                            </Paragraph>

                                            <Typography
                                                align="center"
                                                color="black"
                                                fontWeight="bold"
                                            >
                                                SCOPE OF TERMS
                                            </Typography>

                                            <Paragraph>
                                                These Terms govern the sales of
                                                Smart contracts tokens by the
                                                Company EXTRACTODAO However,
                                                your use of in connection with
                                                the Services, Platform or
                                                Incentives may also be governed
                                                by other collectively applicable
                                                terms and policies, the “Terms
                                                and Platform Policies”).
                                            </Paragraph>

                                            <Paragraph>
                                                All new services and
                                                applications developed by
                                                ExtractoDAO in relation to its
                                                Platform will be governed by
                                                these Terms and may be subject
                                                to additional Terms and Policies
                                                of the Platform with which you
                                                must agree before accessing and
                                                using these new services.
                                            </Paragraph>

                                            <Paragraph>
                                                If any term, clause or provision
                                                of these Terms is found to be
                                                unlawful, void or unenforceable
                                                (in whole or in part), such
                                                term, clause or provision will
                                                be severable from these Terms
                                                without affecting the validity
                                                or enforceability of any
                                                remaining portion of the term,
                                                clause or provision, or any
                                                other term, clause or provision
                                                of these Terms, which shall
                                                remain in full force and effect.
                                            </Paragraph>

                                            <Paragraph>
                                                These Terms constitute the
                                                entire agreement between the
                                                Parties with respect to the
                                                subject matter. These Terms
                                                supersede and extinguish any and
                                                all prior agreements, draft
                                                agreements, arrangements,
                                                warranties, representations,
                                                guarantees, representations, and
                                                commitments of any nature made
                                                by or on behalf of the Parties,
                                                whether oral or written, public
                                                or private, with respect to this
                                                subject.
                                            </Paragraph>

                                            <Typography
                                                align="center"
                                                color="black"
                                                fontWeight="bold"
                                            >
                                                RECOGNITION AND ASSUMPTION OF
                                                RISKS
                                            </Typography>

                                            <Paragraph>
                                                You acknowledge and agree that
                                                there are risks associated with
                                                purchasing, holding, and using
                                                the Smart contracts in
                                                connection with the Services,
                                                Platform and Incentives. By
                                                purchasing stmart contracts, you
                                                expressly acknowledge and assume
                                                these risks. Such risks include,
                                                but are not limited to:
                                            </Paragraph>

                                            <Paragraph>
                                                (i) risk of DeFi code defect;
                                            </Paragraph>
                                            <Paragraph>
                                                (ii) risks related to regulatory
                                                and any uncertainty to the
                                                enforcement of the law related
                                                to blockchain technology is
                                                smart contracts futures;
                                            </Paragraph>

                                            <Paragraph>
                                                (iii) risk of loss of access to
                                                smarts contracts due to loss of
                                                private keys by the buyer, err
                                                in custody or error on your
                                                part;
                                            </Paragraph>

                                            <Paragraph>
                                                (iv) risks arising from your
                                                home country taxation;
                                            </Paragraph>

                                            <Paragraph>
                                                (v) risks associated with the
                                                Matic network and protocol.
                                            </Paragraph>

                                            <Typography
                                                align="center"
                                                color="black"
                                                fontWeight="bold"
                                            >
                                                SECURITY
                                            </Typography>

                                            <Paragraph>
                                                The Buyer is responsible for
                                                implementing security measures
                                                to protect the wallet and its
                                                private keys, vault or other
                                                processing procedures that buyer
                                                uses to receive and hold yous
                                                smart contracts, including
                                                private keys or other
                                                credentials required to access
                                                these processing procedures. If
                                                your private keys or other
                                                access credentials are lost, the
                                                buyer could lose access to your
                                                smart contracts. ExtractoDAO
                                                will not be responsible for such
                                                losses.
                                            </Paragraph>

                                            <Typography
                                                align="center"
                                                color="black"
                                                fontWeight="bold"
                                            >
                                                RIGHT TO REQUEST PERSONAL
                                                INFORMATION
                                            </Typography>

                                            <Paragraph>
                                                We may determine, under our sole
                                                discretion, that it is necessary
                                                to obtain certain information
                                                about the buyer in order to
                                                comply with applicable law or
                                                regulation regarding withdrawal
                                                of products from ExtractoDAO
                                                farms. The request, collection,
                                                storage and use of the personal
                                                data collected are subject to
                                                the General Data Protection
                                                Regulation, in the terms stated
                                                in the Company's Privacy Policy.
                                            </Paragraph>

                                            <Typography
                                                align="center"
                                                color="black"
                                                fontWeight="bold"
                                            >
                                                TAXATION
                                            </Typography>

                                            <Paragraph>
                                                The purchase price that the
                                                buyer pays for Smart contracts
                                                does not include the collection
                                                of any taxes. The Buyer is
                                                responsible for determining
                                                which taxes apply to their
                                                purchase of smart contracts,
                                                including, for example, sales,
                                                use, value added and similar
                                                taxes. It is also the Buyer’s
                                                responsibility to withhold,
                                                collect, report and remit
                                                correct taxes to the appropriate
                                                tax authorities.
                                            </Paragraph>

                                            <Paragraph>
                                                We are not responsible for
                                                withholding, collecting,
                                                reporting or remitting any
                                                sales, use, value added or
                                                similar taxes resulting from
                                                your purchase of smart
                                                contracts.
                                            </Paragraph>

                                            <Typography
                                                align="center"
                                                color="black"
                                                fontWeight="bold"
                                            >
                                                REPRESENTATIONS AND WARRANTIES
                                            </Typography>

                                            <Paragraph>
                                                When buying smart contracts, the
                                                buyer confirms that:
                                            </Paragraph>

                                            <Paragraph>
                                                (i) Buyer has read and
                                                understood these Terms and the
                                                Whitepaper documentation;
                                            </Paragraph>

                                            <Paragraph>
                                                (ii) The buyer has the necessary
                                                authority and consents to accept
                                                these Terms, enter into a
                                                binding contract with the DAO
                                                and perform the obligations set
                                                forth herein;
                                            </Paragraph>

                                            <Paragraph>
                                                (iii) The buyer has a sufficient
                                                understanding of the
                                                functionality, usage, storage,
                                                transmission mechanisms and
                                                other material characteristics
                                                of cryptographic tokens such as
                                                Bitcoin and Ether, token storage
                                                mechanisms (such as token
                                                wallets), blockchain technology
                                                and software systems based on on
                                                blockchain to understand these
                                                Terms and to appreciate the
                                                risks and implications of
                                                purchasing smart contracts;
                                            </Paragraph>

                                            <Paragraph>
                                                (iv) The buyer has obtained
                                                sufficient information about the
                                                smart contracts to make an
                                                informed decision to purchase
                                                it;
                                            </Paragraph>

                                            <Paragraph>
                                                (v) Buyer understands that smart
                                                contracts only confers the right
                                                to receive Kg and powers
                                                associated with it, access the
                                                DAO Platform and participate in
                                                the Incentive Network, and does
                                                not confer any other rights with
                                                respect to the Platform or DAO
                                                or its corporate affiliates,
                                                including, the Buyer
                                                acknowledges no voting power,
                                                distribution, redemption,
                                                liquidation, ownership
                                                (including all forms of
                                                intellectual property) or other
                                                financial or legal rights;
                                            </Paragraph>

                                            <Paragraph>
                                                (vi) The Buyer is buying smart
                                                contracts solely for the purpose
                                                of receiving kg associated , no
                                                exist with and right of
                                                governance from DAO, but rights
                                                of accessing the Platform,
                                                participating in the Incentives
                                                and supporting the development,
                                                testing, deployment and
                                                operation of the Platform, being
                                                aware of the associated business
                                                risks to the ExtractoDAO and the
                                                Platform. The Buyer is not
                                                purchasing smart contrats for
                                                any other purpose except
                                                cooperation in a collective
                                                production with a common
                                                purpose, including but not
                                                limited to any investment,
                                                speculative or other financial
                                                purposes;
                                            </Paragraph>

                                            <Paragraph>
                                                (vii) If the buyer is an
                                                individual, is at least 18 years
                                                old, has sufficient legal
                                                capacity to accept these Terms
                                                and enter into a binding smart
                                                contrato with the ExtractoDAO
                                                under the terms set forth
                                                herein;
                                            </Paragraph>

                                            <Paragraph>
                                                (viii) If the buyer is
                                                purchasing smart contrats for or
                                                on behalf of an entity, such
                                                entity is duly incorporated,
                                                registered and validly existing
                                                under the applicable laws of the
                                                jurisdiction in which the entity
                                                is established;
                                            </Paragraph>

                                            <Paragraph>
                                                (ix) Any purchase of smart
                                                contracts made by the buyer is
                                                not derived from or related to
                                                any illegal activities,
                                                including, but not limited to,
                                                money laundering activities or
                                                terrorist financing;
                                            </Paragraph>

                                            <Paragraph>
                                                (x) The Buyer must not use smart
                                                contracst to fund criminal
                                                activities, engage in or support
                                                any illegal activity;
                                            </Paragraph>

                                            <Paragraph>
                                                (xi) Your purchase of smart
                                                contracts complies with
                                                applicable law and regulation in
                                                your jurisdiction, including,
                                                but not limited to: legal
                                                capacity and any other
                                                applicable legal requirements in
                                                your jurisdiction to purchase
                                                and use smart contracts and
                                                enter into contracts with us;
                                                any exchange or regulatory
                                                restrictions applicable to such
                                                purchase; and any governmental
                                                or other consents that need to
                                                be obtained;
                                            </Paragraph>

                                            <Paragraph>
                                                (xii)The Buyer will comply with
                                                all applicable tax obligations
                                                in its jurisdiction arising from
                                                its purchase of smart contracts.
                                            </Paragraph>

                                            <Paragraph>
                                                (xiii) The buyer assumes a long
                                                position in a blockchain futures
                                                contract named Extracto@ at a
                                                price of{" "}
                                                <strong>
                                                    {contract.amount} kg
                                                </strong>{" "}
                                                of live cattle{" "}
                                                <strong>
                                                    (US$ {contract.price}
                                                    /dollar)
                                                </strong>{" "}
                                                at any time before expiration.
                                            </Paragraph>

                                            <Paragraph>
                                                (xiv) The amount contributed by
                                                the contract holder in
                                                Stablecoin was:{" "}
                                                <strong>
                                                    {contract.valueInFiat}{" "}
                                                    {contract.paymentToken}
                                                </strong>
                                            </Paragraph>

                                            <Paragraph>
                                                (xv) The buyer recognizes that
                                                this is not an investment in
                                                securities and financial
                                                markets, only a non-profit
                                                contribution to collective food
                                                production. The buyer can
                                                withdraw the product for
                                                consumption or donation to
                                                charities and fight hunger or
                                                keep the Cow coins for he
                                            </Paragraph>

                                            <Typography
                                                align="center"
                                                color="black"
                                                fontWeight="bold"
                                            >
                                                INTELLECTUAL PROPERTY
                                            </Typography>

                                            <Paragraph>
                                                In this clause, "ExtractoDAO
                                                intellectual property rights
                                                registered under copyright
                                                terms" refers to the creations
                                                and inventions developed by the
                                                Joel Almeida, including:
                                            </Paragraph>

                                            <Paragraph>
                                                (i) all of DRAWER's patents,
                                                inventions, flowchart designs,
                                                copyrights and related rights,
                                                database rights, know-how and
                                                confidential information,
                                                trademarks, trade names (whether
                                                registered or unregistered) and
                                                rights to apply for
                                                registration;
                                            </Paragraph>

                                            <Paragraph>
                                                (ii) all other rights of a
                                                similar nature or having
                                                equivalent effect anywhere in
                                                the world that currently exist
                                                or are recognized in the future;
                                                and
                                            </Paragraph>

                                            <Paragraph>
                                                (iii) all applications,
                                                extensions and renewals in
                                                relation to any such rights.
                                            </Paragraph>

                                            <Paragraph>
                                                The Buyer has no right to use
                                                without permission plus all
                                                votes, for any purpose, any of
                                                ExtractoDAO's intellectual
                                                property rights. We will always
                                                keep property protected to
                                                secure the rights of Smart
                                                contracts buyers, including all
                                                right, title and interest in and
                                                to such intellectual property
                                                rights. By purchasing smart
                                                contracts, the buyer understands
                                                and accepts that he will not:
                                            </Paragraph>

                                            <Paragraph>
                                                (i) acquire or, in any other
                                                way, be entitled to any
                                                intellectual property rights of
                                                ExtractoDAO for purposes not
                                                conducive to the growth of the
                                                project;
                                            </Paragraph>

                                            <Paragraph>
                                                (ii) make any claim in relation
                                                to any intellectual property
                                                right of ExtractoDAO or any
                                                other equivalent right; or
                                            </Paragraph>

                                            <Paragraph>
                                                (iii) use, attempt to use, copy,
                                                imitate or modify (whether in
                                                whole or in part) any
                                                intellectual property code,
                                                except with our prior written
                                                consent.
                                            </Paragraph>

                                            <Typography
                                                align="center"
                                                color="black"
                                                fontWeight="bold"
                                            >
                                                PUBLIC LIABILITY
                                            </Typography>

                                            <Paragraph>
                                                To the fullest extent permitted
                                                by applicable law, the purchaser
                                                will indemnify, defend and hold
                                                harmless ExtractoDAO and its
                                                respective officers, delegates,
                                                directors, contractors,
                                                consultants, shareholders,
                                                suppliers, service providers,
                                                controllers, subsidiaries,
                                                affiliates, agents,
                                                representatives, predecessors,
                                                successors and assigns from and
                                                against any and all claims,
                                                demands, actions, damages,
                                                losses, costs and expenses
                                                (including reasonable
                                                professional and legal fees)
                                                arising out of or relating to:
                                            </Paragraph>

                                            <Paragraph>
                                                (i) your acquisition or use of
                                                smart contracts under these
                                                Terms;
                                            </Paragraph>

                                            <Paragraph>
                                                (ii) the performance or
                                                non-performance of your
                                                responsibilities or obligations
                                                under these Terms;
                                            </Paragraph>
                                            <Paragraph>
                                                (iii) your breach of any of the
                                                terms and conditions set forth
                                                in these Terms; or
                                            </Paragraph>
                                            <Paragraph>
                                                (iv) your violation of any
                                                rights of any other person or
                                                entity.
                                            </Paragraph>

                                            <Typography
                                                align="center"
                                                color="black"
                                                fontWeight="bold"
                                            >
                                                LIMITATION OF LIABILITY
                                            </Typography>

                                            <Paragraph>
                                                To the fullest extent permitted
                                                by applicable law, under no
                                                circumstances:
                                            </Paragraph>
                                            <Paragraph>
                                                (i) ExtractoDAO shall be liable
                                                for any direct, indirect,
                                                special, incidental or
                                                consequential loss of any kind
                                                (including, but not limited to,
                                                loss of revenue, profit or
                                                business, loss of contract or
                                                depletion of goodwill, loss of
                                                savings, loss of use or data, or
                                                business interruption damages or
                                                any similar loss) arising out of
                                                or in any way connected with the
                                                acquisition, storage, transfer
                                                or use of smart contracts or
                                                otherwise in connection with
                                                these Terms, regardless of the
                                                cause of action based on
                                                contract , tort (including
                                                negligence), breach of statutory
                                                duty, restitution or any other
                                                legal or equitable basis, and
                                            </Paragraph>
                                            <Paragraph>
                                                (ii) the DAO liability, whether
                                                in contract, tort (including
                                                negligence), breach of statutory
                                                duty, restitution or any other
                                                legal or equitable basis,
                                                arising out of or in connection
                                                with these Terms, or the use or
                                                inability to use smart
                                                contracts, shall not will exceed
                                                the value of your purchase.
                                            </Paragraph>
                                            <Paragraph>
                                                The limitations and exclusions
                                                of liability set out in this
                                                clause shall not limit or
                                                exclude liability for gross
                                                negligence, fraud or willful or
                                                reckless misconduct by the DAO,
                                                nor shall it limit or exclude
                                                any losses for which, as a
                                                matter of law enforcement, it
                                                would be unlawful to limit or
                                                exclude liability.
                                            </Paragraph>

                                            <Typography
                                                align="center"
                                                color="black"
                                                fontWeight="bold"
                                            >
                                                APPLICABLE LAW AND DISPUTE
                                                RESOLUTION
                                            </Typography>

                                            <Paragraph>
                                                The Buyer agrees that all
                                                matters related to their access
                                                or use of DRAWER, the issuance
                                                of smart contracts, as well as
                                                the purchase and use of
                                                Extracto@ to be entitled to the
                                                production of animal protein,
                                                will be governed by the laws of
                                                legal.
                                            </Paragraph>
                                            <Paragraph>
                                                The Buyer consents to
                                                jurisdiction and venue in legal,
                                                and waives any objection to such
                                                jurisdiction and venue.
                                            </Paragraph>
                                            <Paragraph>
                                                Any claim under these Terms must
                                                be made within one year after
                                                the cause of action arises, or
                                                such claim or cause of action
                                                will be barred.
                                            </Paragraph>
                                            <Paragraph>
                                                In the event of any dispute or
                                                controversy between the buyer
                                                and the DAO arising out of or
                                                relating to your access to or
                                                use of the Platform or purchase
                                                and use of smart contracts, the
                                                Parties will promptly and in
                                                good faith attempt to resolve
                                                such issues.
                                            </Paragraph>
                                            <Paragraph>
                                                If both parties are unable to
                                                resolve any dispute within a
                                                reasonable time (not to exceed
                                                thirty days), either Party may
                                                submit such controversy or
                                                dispute to mediation. If the
                                                dispute cannot be resolved
                                                through mediation, the Parties
                                                are free to pursue any right or
                                                remedy available under
                                                applicable law.This contract
                                                cannot be terminated according
                                                to the protocol rules, as
                                                established in all of the
                                                clauses of this instrument, and
                                                the buyer must recognize all
                                                potential losses or profit.
                                                ExtractoDAO can never be liable
                                                for losses and damages that may
                                                be caused to the buyer according
                                                to the whitepaper and the
                                                clauses in the smart
                                                contracts.The parties sign this
                                                instrument, and accept that it
                                                is up to the buyer to receive
                                                and manage this document which
                                                recognizes him as the owner of
                                                the goods in his
                                            </Paragraph>

                                            <Typography
                                                align="center"
                                                color="black"
                                                fontWeight="bold"
                                            >
                                                DAO, march 15, 2023
                                            </Typography>

                                            <Typography
                                                align="center"
                                                color="GrayText"
                                                fontWeight="bold"
                                            >
                                                DAO -
                                                0xf5f1289661A373B5E0F374924313833b00Ed7eA2
                                            </Typography>

                                            <Typography
                                                align="center"
                                                color="black"
                                                fontWeight="bold"
                                            >
                                                ---------------------------------{" "}
                                                <br />
                                                ExtractoDAO
                                            </Typography>
                                        </CardContent>
                                    ) : null}
                                </Grid>
                            </Grid>
                        </Collapse>
                    </Box>
                </Card>
            </Box>
        </>
    )
}

export default ContractCard
