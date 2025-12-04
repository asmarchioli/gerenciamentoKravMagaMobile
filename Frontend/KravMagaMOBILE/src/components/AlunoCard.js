import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function AlunoCard({ aluno, onEdit, onDelete }) {
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.name}>{aluno.nome}</Text>
                <Text style={styles.detalhe}>Faixa <Text style={styles.valor}>{aluno.faixa}</Text></Text>
                <Text style={styles.detalhe}>Turma: <Text style={styles.valor}>{aluno.turma}</Text></Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity style={[styles.btn, styles.editBtn]} onPress={onEdit}>
                    <Text style={styles.btnText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.deleteBtn]} onPress={onDelete}>
                    <Text style={styles.btnText}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#333',
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#444',
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#e74c3c',
        marginBottom: 5,
    },
    detalhe: {
        color: '#adb5bd',
        fontSize: 14,
    },
    valor: {
        color: '#fff',
        fontWeight: 'bold',
    },
    actions: {
        flexDirection: 'column',
        gap: 8, //////////////////////////////////////////
    },
    btn: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 4,
        alignItems: 'center',
    },
    editBtn: {
        backgroundColor: '#f39c12',
    },
    deleteBtn: {
        backgroundColor: '#e74c3c',
    },
    btnText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
});
