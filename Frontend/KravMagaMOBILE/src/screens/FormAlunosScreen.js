import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import api from '../services/api';
import { Picker } from '@react-native-picker/picker';

export default function FormAlunosScreen({ route, navigation }) {
    const { alunoId } = route.params || {};
    const isEditing = !!alunoId;

    const faixasEnum = [
        "BRANCA", "AMARELA", "LARANJA", "BORDÔ", 
        "VERDE", "AZUL", "ROXA", "MARROM", "PRETA"
    ];

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [faixa, setFaixa] = useState('BRANCA');
    const [turma, setTurma] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [endereco, setEndereco] = useState('');
    
    const [dataNascimentoDisplay, setDataNascimentoDisplay] = useState('');
    const [dataProxGraduacaoDisplay, setDataProxGraduacaoDisplay] = useState('');

    const formatToDisplay = (isoDate) => {
        if (!isoDate) return '';
        const [year, month, day] = isoDate.split('-');
        return `${day}/${month}/${year}`;
    };

    const formatToISO = (displayDate) => {
        if (!displayDate || displayDate.length !== 10) return null;
        const [day, month, year] = displayDate.split('/');
        return `${year}-${month}-${day}`;
    };

    const handleDateChange = (text, setter) => {
        const cleaned = text.replace(/[^0-9]/g, '');
        let formatted = cleaned;

        if (cleaned.length > 2) {
            formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
        }
        if (cleaned.length > 4) {
            formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
        }
        if (cleaned.length >= 8) { 
             formatted = formatted.substring(0, 10);
        }
        
        setter(formatted);
    };

    useEffect(() => {
        if (isEditing) {
            api.get(`/alunos/${alunoId}`)
                .then(response => {
                    const aluno = response.data;
                    setNome(aluno.nome);
                    setCpf(aluno.cpf);
                    setFaixa(aluno.faixa);
                    setTurma(aluno.turma);
                    setTelefone(aluno.telefone);
                    setEmail(aluno.email);
                    setEndereco(aluno.endereco);
                    setDataNascimentoDisplay(formatToDisplay(aluno.dataNascimento));
                    setDataProxGraduacaoDisplay(formatToDisplay(aluno.dataProxGraduacao));
                })
                .catch(error => {
                    console.error("Erro ao buscar aluno", error);
                    Alert.alert('Erro', 'Não foi possível carregar os dados do aluno.');
                    navigation.goBack();
                });
        }
    }, [alunoId]);

    const handleSave = async () => {
        const dataNascISO = formatToISO(dataNascimentoDisplay);
        const dataProxISO = formatToISO(dataProxGraduacaoDisplay);

        const alunoData = {
            nome, cpf, faixa, turma, telefone, email,
            endereco: endereco || null, 
            dataNascimento: dataNascISO || null,
            dataProxGraduacao: dataNascISO || null
        };

        try {
            if (isEditing) {
                await api.put(`/alunos/${alunoId}`, alunoData);
                Alert.alert('Sucesso', 'Aluno atualizado com sucesso!');
            } else {
                await api.post('/alunos', alunoData);
                Alert.alert('Sucesso', 'Aluno cadastrado com sucesso!');
            }
            navigation.goBack();

        } catch (error) {
            let msg = 'Não foi possível salvar os dados do aluno.';

            if (error.response) {
                // Log para depuração (veja no terminal do Metro o que o Java mandou)
                console.log("Erro Backend:", JSON.stringify(error.response.data, null, 2));

                const data = error.response.data;

                // CASO 1: Erros de Validação do @Valid (Spring Boot padrão ou customizado)
                // O formato pode variar dependendo de como o GlobalExceptionHandler monta.
                // Se for o padrão do Spring Boot (sem handler): timestamp, status, error, path, etc.
                // Se for o SEU GlobalExceptionHandler: { "errors": { "campo": "mensagem" } }
                
                if (data && data.errors) {
                    // Transforma o objeto de erros {"cpf": "erro", "email": "erro"} em texto
                    // Object.values pega só as mensagens: ["erro do cpf", "erro do email"]
                    const listaErros = Object.values(data.errors);
                    msg = listaErros.join('\n'); // Junta com quebra de linha
                } 
                // CASO 2: Erro de Regra de Negócio (Sua RegraNegocioException)
                // JSON: { "erro": "Mensagem específica" }
                else if (data && data.erro) {
                    msg = data.erro;
                }
                // CASO 3: Mensagem genérica de erro do Spring
                else if (data && data.message) {
                     msg = data.message;
                }
            }
            else if (error.request){
                msg = "Sem resposta do servidor. Verifique sua conexão e o IP.";
            }
            else {
                msg = error.message;
            }

            Alert.alert('Erro ao salvar', msg);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.sectionTitle}>{isEditing ? 'Editar Aluno' : 'Novo Aluno'}</Text>
      
            <Text style={styles.label}>Nome Completo *</Text>
            <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholderTextColor="#666"/>

            <Text style={styles.label}>CPF *</Text>
            <TextInput style={styles.input} value={cpf} onChangeText={setCpf} keyboardType="numeric"/>

            <Text style={styles.label}>Email *</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"/>

            <Text style={styles.label}>Telefone *</Text>
            <TextInput style={styles.input} value={telefone} onChangeText={setTelefone} keyboardType="phone-pad"/>

            <Text style={styles.label}>Faixa *</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={faixa}
                    onValueChange={(itemValue) => setFaixa(itemValue)}
                    style={styles.picker}
                    dropdownIconColor="#fff"
                >
                    {faixasEnum.map((f) => (
                        <Picker.Item key={f} label={f} value={f} color="#000" />
                    ))}
                </Picker>
            </View>

            <Text style={styles.label}>Turma *</Text>
            <TextInput style={styles.input} value={turma} onChangeText={setTurma} />

            <Text style={styles.label}>Endereço</Text>
            <TextInput style={styles.input} value={endereco} onChangeText={setEndereco} />

            <Text style={styles.label}>Data Nascimento (DD/MM/AAAA)</Text>
            <TextInput 
                style={styles.input} 
                value={dataNascimentoDisplay} 
                onChangeText={(text) => handleDateChange(text, setDataNascimentoDisplay)} 
                placeholder="01/01/2000"
                placeholderTextColor="#666"
                keyboardType="numeric"
                maxLength={10}
            />

            <Text style={styles.label}>Data Próx. Graduação (DD/MM/AAAA)</Text>
            <TextInput 
                style={styles.input} 
                value={dataProxGraduacaoDisplay} 
                onChangeText={(text) => handleDateChange(text, setDataProxGraduacaoDisplay)}
                placeholder="20/12/2025"
                placeholderTextColor="#666"
                keyboardType="numeric"
                maxLength={10}
            />

            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>SALVAR</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#222',
        flexGrow: 1
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center'
    },
    label: {
        fontWeight: 'bold',
        marginTop: 15,
        color: '#e74c3c' },
    input: {
        backgroundColor: '#303030',
        color: '#fff',
        borderWidth: 1,
        borderColor: '#444',
        borderRadius: 5,
        padding: 12,
        marginTop: 5,
        fontSize: 16 
    },
    btnContainer: {
        marginTop: 30,
        marginBottom: 40
    },
    saveButton: {
        backgroundColor: '#e74c3c',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center'
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    pickerContainer: {
        backgroundColor: '#303030',
        borderWidth: 1,
        borderColor: '#444',
        borderRadius: 5,
        marginTop: 5,
        justifyContent: 'center'
    },
    picker: {
        color: '#fff',
    },
});